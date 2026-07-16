import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { readFile } from "fs/promises";
import path from "path";
import { vietnamTimestamp } from "./constants";

const MANAGER_EMAIL = process.env.FEEDBACK_EMAIL_TO || "anvuong@dalathasfarm.com";
const CC_EMAIL =
  process.env.FEEDBACK_EMAIL_CC || "tuyendung.dalathasfarm@gmail.com";

export type EmailRecord = {
  id: string;
  fullName: string;
  phone: string;
  department: string;
  content: string;
  imagePath: string | null;
  imageName: string | null;
};

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:12px 20px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7c8a80;width:150px;vertical-align:top;border-bottom:1px solid #e8e2d2;font-family:Arial,sans-serif;">${label}</td>
      <td style="padding:12px 20px;font-size:14px;color:#16291f;border-bottom:1px solid #e8e2d2;font-family:Arial,sans-serif;line-height:1.6;">${value || '<span style="color:#a3a795">—</span>'}</td>
    </tr>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br/>");
}

function buildHtml(r: EmailRecord, createdAt: Date, hasImage: boolean): string {
  return `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#efe9d9;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#0d211a;border-radius:24px 24px 0 0;padding:36px 40px;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:.28em;text-transform:uppercase;color:#c9a24b;">Dalat Hasfarm · Tuyển dụng</div>
      <h1 style="margin:14px 0 0;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:30px;line-height:1.25;color:#f4eedf;">Góp ý mới từ<br/><em style="color:#a7c4a0;">kênh phản hồi nội bộ</em></h1>
    </div>
    <div style="background:#fbf8f0;padding:8px 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Thờ gian", vietnamTimestamp(createdAt))}
        ${row("Họ tên", r.fullName ? escapeHtml(r.fullName) : '<em style="color:#7c8a80">Ẩn danh</em>')}
        ${row("Điện thoại", escapeHtml(r.phone))}
        ${row("Bộ phận", escapeHtml(r.department))}
      </table>
      <div style="padding:22px 20px 6px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7c8a80;font-family:Arial,sans-serif;">Nội dung góp ý</div>
      <div style="margin:6px 20px 20px;padding:20px 22px;background:#f1ecdd;border-left:3px solid #c9a24b;border-radius:0 14px 14px 14px;font-size:15px;line-height:1.75;color:#16291f;font-family:Arial,sans-serif;">${escapeHtml(r.content)}</div>
      ${
        hasImage
          ? `<div style="padding:0 20px 24px;font-family:Arial,sans-serif;">
               <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7c8a80;padding-bottom:12px;">Hình ảnh làm chứng</div>
               <img src="cid:evidence" alt="Hình ảnh làm chứng" style="max-width:100%;border-radius:14px;border:1px solid #e4ddc8;"/>
             </div>`
          : ""
      }
      <div style="padding:20px 28px 30px;font-size:12px;line-height:1.7;color:#8a9489;font-family:Arial,sans-serif;border-top:1px solid #e8e2d2;">
        Thông tin này được gửi tự động từ website Góp ý – Phản hồi của Dalat Hasfarm.<br/>
        Mọi nội dung được bảo mật và chỉ phục vụ mục đích cải thiện môi trường làm việc nội bộ.
      </div>
    </div>
    <div style="background:#0d211a;border-radius:0 0 24px 24px;padding:16px 40px;text-align:center;">
      <span style="font-family:Georgia,serif;font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:#5f8f6b;">Lắng nghe · Thấu hiểu · Hành động</span>
    </div>
  </div>
</body></html>`;
}

/**
 * Sends the feedback notification to the recruitment manager.
 * Returns true when delivered, false when skipped/failed.
 */
export async function sendFeedbackEmail(
  record: EmailRecord,
  createdAt: Date,
): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    console.warn(
      "[email] SMTP_HOST / SMTP_USER / SMTP_PASS not configured — skipping email.",
    );
    return false;
  }

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const attachments: Mail.Attachment[] = [];
    if (record.imagePath) {
      try {
        const buffer = await readFile(record.imagePath);
        const ext = path.extname(record.imagePath).slice(1) || "jpeg";
        attachments.push({
          filename: record.imageName ?? `minh-chung.${ext}`,
          content: buffer,
          cid: "evidence",
          contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
        });
      } catch (err) {
        console.error("[email] could not attach evidence image:", err);
      }
    }

    await transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Dalat Hasfarm — Góp ý nội bộ" <${user}>`,
      to: MANAGER_EMAIL,
      cc: CC_EMAIL,
      subject: `[Góp ý mới] ${record.department || "Nội bộ"} — ${record.fullName || "Ẩn danh"} · ${vietnamTimestamp(createdAt)}`,
      html: buildHtml(record, createdAt, attachments.length > 0),
      attachments,
    });
    return true;
  } catch (err) {
    console.error("[email] send failed:", err);
    return false;
  }
}
