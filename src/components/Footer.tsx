import Image from "next/image";
import { ShieldCheck, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className="border-y border-border bg-card/60">
        <div className="mx-auto max-w-[1500px] px-5 py-4 text-center sm:px-8 lg:px-12">
          <p className="text-sm font-medium text-muted">
            Mỗi góp ý của bạn đều góp phần tạo nên một Dalat Hasfarm tốt đẹp hơn.
          </p>
        </div>
      </div>
    
      <footer className="relative bg-background">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-12">
          <div>
            <div className="flex items-center">
              <Image
                src="/Logo-Dalat-Hasfarm.png"
                alt="Dalat Hasfarm"
                width={780}
                height={184}
                className="h-11 w-auto"
              />
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
                  tuyendung@dalathasfarm.com
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
