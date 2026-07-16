export const DEPARTMENTS = [
  "Sản xuất / Chăm sóc hoa",
  "Thu hoạch",
  "Đóng gói / Thành phẩm",
  "Kho & Vận chuyển",
  "Kỹ thuật / Bảo trì",
  "Chất lượng (QA/QC)",
  "Hành chính – Nhân sự",
  "Kế toán",
  "Kinh doanh / Sales",
  "Khác",
] as const;

export const CONTENT_MIN = 10;
export const CONTENT_MAX = 2000;
export const IMAGE_MAX_BYTES = 8 * 1024 * 1024; // 8MB
export const IMAGE_ACCEPT = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

export const PHONE_REGEX = /^(?:\+84|84|0)(3|5|7|8|9)\d{8}$/;

export type FeedbackPayload = {
  fullName: string;
  phone: string;
  department: string;
  content: string;
};

export function validatePayload(p: FeedbackPayload): string | null {
  const content = p.content.trim();
  if (!content) return "Vui lòng nhập nội dung góp ý.";
  if (content.length < CONTENT_MIN)
    return `Nội dung góp ý cần tối thiểu ${CONTENT_MIN} ký tự.`;
  if (content.length > CONTENT_MAX)
    return `Nội dung góp ý vượt quá ${CONTENT_MAX} ký tự.`;
  if (p.phone.trim() && !PHONE_REGEX.test(p.phone.trim().replace(/[\s.-]/g, "")))
    return "Số điện thoại không đúng định dạng Việt Nam.";
  return null;
}

export function vietnamTimestamp(date = new Date()): string {
  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
