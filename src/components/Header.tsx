import Image from "next/image";

export default function Header() {
  return (
    <header className="relative z-40 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
      <a href="/" className="flex items-center gap-3">
        <Image
          src="/Logo-Dalat-Hasfarm.png"
          alt="Dalat Hasfarm"
          width={720}
          height={192}
          className="h-11 w-auto"
        />
        <span className="leading-none">          
          <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.28em] text-muted">
            Phòng Nhân sự
          </span>
        </span>
      </a>
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted shadow-[var(--shadow-soft)] sm:flex">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          Kênh góp ý nội bộ
        </span>
      </div>
    </header>
  );
}
