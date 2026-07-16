import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import os from "os";
import { db } from "@/db";
import { feedback } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  validatePayload,
  IMAGE_ACCEPT,
  IMAGE_MAX_BYTES,
  type FeedbackPayload,
} from "@/lib/constants";
import { appendFeedbackToSheet } from "@/lib/sheets";
import { sendFeedbackEmail } from "@/lib/email";

const UPLOAD_DIR = path.join(os.tmpdir(), "dalat-uploads");
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const payload: FeedbackPayload = {
      fullName: String(form.get("fullName") ?? "").trim().slice(0, 120),
      phone: String(form.get("phone") ?? "").trim().slice(0, 20),
      department: String(form.get("department") ?? "").trim().slice(0, 140),
      content: String(form.get("content") ?? "").trim(),
    };

    const error = validatePayload(payload);
    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 400 });
    }

    // ---- evidence image (optional)
    let imagePath: string | null = null;
    let imageName: string | null = null;
    const file = form.get("image");
    if (file && file instanceof File && file.size > 0) {
      if (!IMAGE_ACCEPT.includes(file.type)) {
        return NextResponse.json(
          { ok: false, error: "Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF." },
          { status: 400 },
        );
      }
      if (file.size > IMAGE_MAX_BYTES) {
        return NextResponse.json(
          { ok: false, error: "Ảnh vượt quá dung lượng cho phép (8MB)." },
          { status: 400 },
        );
      }
      const ext = EXT_BY_TYPE[file.type] ?? "jpg";
      const filename = `${randomUUID()}.${ext}`;
      await mkdir(UPLOAD_DIR, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(path.join(UPLOAD_DIR, filename), buffer);
      imagePath = path.join(UPLOAD_DIR, filename);
      imageName = file.name?.slice(0, 255) || filename;
    }

    // ---- persist
    const [inserted] = await db
      .insert(feedback)
      .values({
        fullName: payload.fullName || null,
        phone: payload.phone || null,
        department: payload.department || null,
        content: payload.content,
        imagePath,
        imageName,
      })
      .returning({ id: feedback.id, createdAt: feedback.createdAt });

    // ---- integrations (best effort, non-blocking semantics)
    const record = {
      id: inserted.id,
      fullName: payload.fullName,
      phone: payload.phone,
      department: payload.department,
      content: payload.content,
      imagePath,
      imageName,
    };

    const [sheetSynced, emailSent] = await Promise.all([
      appendFeedbackToSheet(record, inserted.createdAt),
      sendFeedbackEmail(record, inserted.createdAt),
    ]);

    if (sheetSynced || emailSent) {
      await db
        .update(feedback)
        .set({ sheetSynced, emailSent })
        .where(eq(feedback.id, inserted.id));
    }

    return NextResponse.json({
      ok: true,
      id: inserted.id,
      delivered: { sheet: sheetSynced, email: emailSent },
    });
  } catch (err) {
    console.error("[feedback] unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại sau ít phút.",
      },
      { status: 500 },
    );
  }
}
