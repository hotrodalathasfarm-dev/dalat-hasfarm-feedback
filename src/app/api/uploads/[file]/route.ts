import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import os from "os";

const UPLOAD_DIR = path.join(os.tmpdir(), "dalat-uploads");
const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

type Ctx = { params: Promise<{ file: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { file } = await ctx.params;

  // strict allowlist: uuid.ext only
  if (!/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  try {
    const fullPath = path.join(UPLOAD_DIR, file);
    if (!fullPath.startsWith(UPLOAD_DIR)) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }
    const buffer = await readFile(fullPath);
    const ext = file.split(".").pop()?.toLowerCase() ?? "jpg";
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": CONTENT_TYPES[ext] ?? "application/octet-stream",
        "Cache-Control": "private, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
}
