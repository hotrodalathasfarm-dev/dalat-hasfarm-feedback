import { Flower2, ShieldCheck, PhoneCall } from "lucide-react";

function Marquee() {
  const words = ["Lắng nghe", "Thấu hiểu", "Hành động", "Bảo mật", "Tôn trọng"];
  return (
    <div className="relative overflow-hidden border-y border-border bg-card py-2.5">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8" aria-hidden={half === 1}>
            {Array.from({ length: 2 }).flatMap((_, r) =>
              words.map((w) => (
                <span
                  key={`${half}-${r}-${w}`}
                  className="flex items-center gap-8 text-[10.5px] font-medium uppercase tracking-[0.24em] text-muted"
                >
                  {w}
                  <Flower2 className="size-3 text-primary/40" />
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <Marquee />
      <footer className="relative bg-background">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-primary">
                <Flower2 className="size-4.5" />
              </span>
              <span className="text-lg font-semibold text-text">
                Dalat Hasfarm
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-muted">
              Kênh góp ý – phản hồi nội bộ. Mọi thông tin được bảo mật tuyệt
              đối và chỉ phục vụ mục đích cải thiện môi trường làm việc: văn
              minh, cởi mở và tích cực hơn.
            </p>
          </div>
          <div>
            <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-primary">
              Liên hệ trực tiếp
            </h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-text">              
              <li>
                <a
                  href="mailto:tuyendung@dalathasfarm.com"
                  className="link-sweep inline-block"
                >
                  tuyendung.dalathasfarm@gmail.com
                </a>
                <span className="mt-0.5 block text-[10.5px] text-muted">
                  Phòng Tuyển dụng
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-primary">
              Cam kết của chúng tôi
            </h4>
            <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-muted">
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                Bảo mật danh tính — bạn có thể góp ý hoàn toàn ẩn danh.
              </li>
              <li className="flex gap-2.5">
                <PhoneCall className="mt-0.5 size-4 shrink-0 text-primary" />
                Mọi ý kiến đều ghi nhận và lắng nghe trực tiếp.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-2 px-5 py-5 text-[10.5px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:px-8 lg:px-12">
            <span>© 2026 Dalat Hasfarm — Phòng Nhân sự</span>
          </div>
        </div>
      </footer>
    </>
  );
}
