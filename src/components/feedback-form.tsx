"use client";

import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Building2,
  MessageSquareText,
  ImagePlus,
  ChevronDown,
  X,
  Send,
  LoaderCircle,
  CircleAlert,
  Check,
  Flower2,
  ArrowUpRight,
} from "lucide-react";
import {
  DEPARTMENTS,
  CONTENT_MIN,
  CONTENT_MAX,
  PHONE_REGEX,
  IMAGE_MAX_BYTES,
  IMAGE_ACCEPT,
} from "@/lib/constants";

type Status = "idle" | "submitting" | "success";

const inputCls =
  "w-full bg-transparent px-4 py-3 text-[15px] text-text placeholder:text-muted/50 focus:outline-none";

function Label({
  htmlFor,
  icon: Icon,
  text,
  required,
}: {
  htmlFor: string;
  icon: typeof User;
  text: string;
  required?: boolean;
}) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted"
      >
        <Icon className="size-3.5 text-primary" strokeWidth={2.2} />
        {text}
        {required && <span className="text-error">*</span>}
      </label>
      {!required && (
        <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-wider text-muted">
          Không bắt buộc
        </span>
      )}
    </div>
  );
}

export default function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);
  const deptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  function pickFile(next: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    if (!next) {
      setFile(null);
      setPreview(null);
      return;
    }
    if (!IMAGE_ACCEPT.includes(next.type)) {
      setError("Chỉ chấp nhận ảnh JPG, PNG, WEBP hoặc GIF.");
      return;
    }
    if (next.size > IMAGE_MAX_BYTES) {
      setError("Ảnh vượt quá dung lượng cho phép (8MB).");
      return;
    }
    setError(null);
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) pickFile(dropped);
  }

  function validate(): string | null {
    const trimmed = content.trim();
    if (!trimmed) return "Vui lòng nhập nội dung góp ý của bạn.";
    if (trimmed.length < CONTENT_MIN)
      return `Nội dung cần tối thiểu ${CONTENT_MIN} ký tự để chúng tôi hiểu rõ hơn.`;
    if (trimmed.length > CONTENT_MAX)
      return `Nội dung vượt quá ${CONTENT_MAX} ký tự.`;
    if (phone.trim() && !PHONE_REGEX.test(phone.trim().replace(/[\s.-]/g, "")))
      return "Số điện thoại chưa đúng định dạng (VD: 0912 345 678).";
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setError(null);
    setStatus("submitting");

    const body = new FormData();
    body.set("fullName", fullName);
    body.set("phone", phone);
    body.set("department", department);
    body.set("content", content.trim());
    if (file) body.set("image", file);

    try {
      const res = await fetch("/api/feedback", { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setError("Không thể kết nối máy chủ. Vui lòng thử lại sau ít phút.");
      setStatus("idle");
    }
  }

  function reset() {
    setFullName("");
    setPhone("");
    setDepartment("");
    setContent("");
    pickFile(null);
    setError(null);
    setStatus("idle");
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center py-10 text-center lg:py-16"
          >
            <div className="relative mb-8">
              <motion.svg
                viewBox="0 0 100 100"
                className="size-28"
                initial="hidden"
                animate="visible"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#2e7d32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                      pathLength: 1,
                      transition: { duration: 0.9, ease: "easeOut" },
                    },
                  }}
                />
                <motion.path
                  d="M32 51.5 44.5 63 69 38"
                  fill="none"
                  stroke="#24332b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                      pathLength: 1,
                      transition: { delay: 0.7, duration: 0.45 },
                    },
                  }}
                />
              </motion.svg>
              <motion.div
                className="absolute -inset-4 -z-10 rounded-full bg-primary-soft"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
              />
            </div>

            <h3 className="text-3xl font-bold text-text lg:text-4xl">
              Góp ý đã được <span className="text-primary">gieo đi</span>
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Cảm ơn bạn đã dành thời gian chia sẻ. Nội dung đã được chuyển
              trực tiếp đến <strong className="text-text">Quản lý Tuyển dụng</strong> và sẽ được xem
              xét, phản hồi sớm nhất trong vòng 48 giờ làm việc.
            </p>

            <button
              onClick={reset}
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-border bg-background px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-text transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              Gửi thêm ý kiến khác
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* name + phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="input-box">
                <div className="px-4 pt-3">
                  <Label htmlFor="fullName" icon={User} text="Họ và tên" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Nguyễn Văn A (có thể ẩn danh)"
                  value={fullName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFullName(e.target.value)
                  }
                  className={inputCls}
                  maxLength={120}
                />
              </div>
              <div className="input-box">
                <div className="px-4 pt-3">
                  <Label htmlFor="phone" icon={Phone} text="Số điện thoại" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="09xx xxx xxx"
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                  className={inputCls}
                  maxLength={20}
                />
              </div>
            </div>

            {/* department */}
            <div className="relative" ref={deptRef}>
              <div className="input-box px-4 py-3">
                <Label htmlFor="department" icon={Building2} text="Bộ phận" />
                <button
                  id="department"
                  type="button"
                  onClick={() => setDeptOpen((v) => !v)}
                  aria-expanded={deptOpen}
                  className={`flex w-full items-center justify-between text-left text-[15px] ${
                    department ? "text-text" : "text-muted/50"
                  }`}
                >
                  <span>{department || "Chọn bộ phận đang công tác"}</span>
                  <ChevronDown
                    className={`size-4 text-muted transition-transform duration-300 ${
                      deptOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              <AnimatePresence>
                {deptOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.99 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-[var(--radius-input)] border border-border bg-card p-1.5 shadow-[var(--shadow-soft)]"
                  >
                    {DEPARTMENTS.map((d) => (
                      <li key={d}>
                        <button
                          type="button"
                          onClick={() => {
                            setDepartment(d);
                            setDeptOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-[13.5px] transition-colors ${
                            department === d
                              ? "bg-primary text-white"
                              : "text-text hover:bg-background"
                          }`}
                        >
                          {d}
                          {department === d && (
                            <Check className="size-4 text-white" />
                          )}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* content */}
            <div className="input-box px-4 pt-3">
              <Label
                htmlFor="content"
                icon={MessageSquareText}
                text="Nội dung góp ý"
                required
              />
              <textarea
                id="content"
                rows={5}
                placeholder="Chia sẻ về môi trường làm việc, quy trình, điều kiện lao động hoặc bất kỳ điều gì bạn đang quan tâm…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${inputCls} resize-none px-0 leading-relaxed`}
                maxLength={CONTENT_MAX + 100}
              />
              <div className="flex items-center justify-between pb-3 pt-1 text-[10.5px] text-muted">
                <span>Tối thiểu {CONTENT_MIN} ký tự</span>
                <span
                  className={
                    content.length > CONTENT_MAX ? "font-semibold text-error" : ""
                  }
                >
                  {content.length}/{CONTENT_MAX}
                </span>
              </div>
            </div>

            {/* evidence image */}
            <div>
              <Label htmlFor="image" icon={ImagePlus} text="Hình ảnh làm chứng" />
              <input
                ref={fileInput}
                id="image"
                type="file"
                accept={IMAGE_ACCEPT.join(",")}
                className="hidden"
                onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              />
              {preview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4 rounded-[var(--radius-input)] border border-border bg-background p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Ảnh minh chứng"
                    className="size-16 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-text">
                      {file?.name}
                    </p>
                    <p className="text-[11px] text-muted">
                      {file ? (file.size / 1024 / 1024).toFixed(2) : ""} MB ·
                      sẵn sàng gửi kèm
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => pickFile(null)}
                    aria-label="Xóa ảnh"
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted transition-all hover:border-error/40 hover:bg-error-soft hover:text-error"
                  >
                    <X className="size-4" />
                  </button>
                </motion.div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`group flex w-full flex-col items-center gap-2.5 rounded-[var(--radius-input)] border border-dashed px-6 py-7 text-center transition-all duration-300 ${
                    dragging
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-background hover:border-primary/50 hover:bg-primary-soft/60"
                  }`}
                >
                  <span className="grid size-11 place-items-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                    <ImagePlus className="size-5" />
                  </span>
                  <span className="text-[13px] font-medium text-text">
                    Kéo thả ảnh vào đây hoặc{" "}
                    <span className="underline decoration-primary decoration-2 underline-offset-4">
                      chọn từ thiết bị
                    </span>
                  </span>
                  <span className="text-[10.5px] uppercase tracking-wider text-muted">
                    JPG · PNG · WEBP · GIF — tối đa 8MB
                  </span>
                </button>
              )}
            </div>

            {/* error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: -16 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                  exit={{ opacity: 0, height: 0, marginTop: -16 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 rounded-[var(--radius-input)] border border-error/25 bg-error-soft px-4.5 py-3.5 text-[13px] leading-relaxed text-error">
                    <CircleAlert className="mt-0.5 size-4 shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* submit */}
            <div className="pt-1">
              <motion.button
                type="submit"
                disabled={status === "submitting"}
                whileTap={{ scale: 0.985 }}
                className="group relative flex h-[52px] w-full items-center justify-center gap-3 overflow-hidden rounded-[14px] bg-primary text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-shadow duration-300 hover:bg-primary-hover hover:shadow-[0_16px_40px_-16px_rgba(46,125,50,0.55)] disabled:cursor-wait disabled:opacity-90"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="size-4.5 animate-spin" />
                    Đang gửi góp ý…
                  </>
                ) : (
                  <>
                    <Flower2 className="size-4.5 transition-transform duration-500 group-hover:rotate-45" />
                    Gửi ý kiến của tôi
                    <Send className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </motion.button>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-muted">
                Thông tin được mã hóa & chuyển trực tiếp đến Quản lý Tuyển
                dụng. Bạn có thể để trống họ tên để góp ý ẩn danh.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
