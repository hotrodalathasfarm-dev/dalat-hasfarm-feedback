"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Flower2,
  Sprout,
  Mailbox,
  ShieldCheck,
  Clock4,
  Leaf,
  PhoneCall,
} from "lucide-react";
import FeedbackForm from "@/components/feedback-form";

const IMG_MAIN =
  "https://images.pexels.com/photos/15236792/pexels-photo-15236792.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900";
const IMG_SECOND =
  "https://images.pexels.com/photos/25566637/pexels-photo-25566637.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=520&w=420";
const IMG_WIDE =
  "https://images.pexels.com/photos/11690877/pexels-photo-11690877.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=520&w=1400";

const STEPS = [
  {
    icon: Sprout,
    title: "Bạn chia sẻ",
    desc: "Ý kiến được ghi nhận ngay khi bạn nhấn gửi, có thể hoàn toàn ẩn danh.",
  },
  {
    icon: Mailbox,
    title: "Đến đúng người",
    desc: "Tự động chuyển email tới Quản lý Tuyển dụng, kèm ảnh minh chứng.",
  },
  {
    icon: ShieldCheck,
    title: "Bảo mật & phản hồi",
    desc: "Nội dung bảo mật tuyệt đối, phục vụ cải thiện; phản hồi sớm nhất.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.85, ease: EASE },
  }),
};

function CircleBadge() {
  return (
    <div className="relative grid size-28 place-items-center lg:size-32">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 animate-spin-slow text-sage"
      >
        <defs>
          <path
            id="badge-circle"
            d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fontSize="8.2"
          letterSpacing="2.6"
          fill="currentColor"
          style={{ textTransform: "uppercase", fontWeight: 600 }}
        >
          <textPath href="#badge-circle">
            Lắng nghe · Thấu hiểu · Hành động ·
          </textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/30">
        <Flower2 className="size-5" />
      </span>
    </div>
  );
}

function Marquee() {
  const words = ["Lắng nghe", "Thấu hiểu", "Hành động", "Bảo mật", "Tôn trọng"];
  return (
    <div className="relative overflow-hidden border-y border-cream/10 bg-gold py-3.5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10" aria-hidden={half === 1}>
            {Array.from({ length: 3 }).flatMap((_, r) =>
              words.map((w) => (
                <span
                  key={`${half}-${r}-${w}`}
                  className="flex items-center gap-10 text-[13px] font-semibold uppercase tracking-[0.3em] text-pine"
                >
                  {w}
                  <Flower2 className="size-4 text-pine/60" />
                </span>
              )),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const archY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={heroRef} className="relative min-h-dvh bg-pine">
      {/* ── header ─────────────────────────────── */}
      <header className="relative z-40 mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-cream text-pine">
            <Flower2 className="size-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[17px] tracking-wide text-cream">
              Dalat Hasfarm
            </span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.34em] text-sage">
              Tuyển dụng · Nhân sự
            </span>
          </span>
        </a>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-cream/80 sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-sage" />
            </span>
            Kênh góp ý nội bộ
          </span>
        </div>
      </header>

      {/* ── hero split ─────────────────────────── */}
      <main className="mx-auto grid max-w-[1500px] lg:grid-cols-[1.04fr_1fr] lg:gap-10 lg:px-6 xl:gap-16 xl:px-10">
        {/* left — brand panel */}
        <section className="relative overflow-hidden px-5 pb-14 pt-6 sm:px-8 lg:min-h-[calc(100dvh-96px)] lg:px-12 lg:pt-2">
          {/* decor */}
          <div className="pointer-events-none absolute -left-40 top-24 size-[420px] rounded-full bg-fern/40 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 bottom-0 size-[380px] rounded-full bg-gold/10 blur-[110px]" />
          <Leaf
            className="pointer-events-none absolute right-[12%] top-10 hidden size-24 rotate-12 text-cream/[0.05] lg:block"
            strokeWidth={1}
          />

          <div className="relative">
            <motion.p
              custom={0}
              variants={rise}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-gold"
            >
              <span className="h-px w-10 bg-gold/60" />
              Chung tay xây dựng môi trường làm việc tốt hơn
            </motion.p>

            <h1 className="mt-6 font-display text-[13.5vw] leading-[1.04] text-cream sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]">
              <motion.span
                custom={1}
                variants={rise}
                initial="hidden"
                animate="show"
                className="block"
              >
                Mỗi ý kiến <em className="italic text-sage">gieo</em>
              </motion.span>
              <motion.span
                custom={2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="block"
              >
                một mầm{" "}
                <em className="relative inline-block italic text-gold">
                  thay đổi
                  <svg
                    viewBox="0 0 220 14"
                    className="absolute -bottom-2 left-0 w-full text-gold/70"
                    fill="none"
                  >
                    <motion.path
                      d="M4 10 C 60 2, 160 2, 216 8"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                </em>
              </motion.span>
            </h1>

            <motion.p
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-xl text-[14.5px] leading-[1.85] text-cream/70"
            >
              Chúng tôi luôn trân trọng từng chia sẻ của bạn — những người đang
              trực tiếp tạo nên giá trị mỗi ngày tại Dalat Hasfarm. Hãy dành ít
              phút để chúng tôi được{" "}
              <span className="text-cream">lắng nghe nhiều hơn</span>, hiểu sâu
              hơn và cải thiện kịp thời hơn — về môi trường làm việc, quy
              trình, điều kiện lao động hay bất kỳ điều gì bạn quan tâm.
            </motion.p>

            {/* wide banner for mobile/tablet */}
            <motion.div
              custom={4}
              variants={rise}
              initial="hidden"
              animate="show"
              className="relative mt-10 overflow-hidden rounded-3xl lg:hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG_WIDE}
                alt="Thung lũng nhà kính hoa tại Đà Lạt"
                className="h-44 w-full object-cover sm:h-56"
                loading="lazy"
              />
              <span className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-cream/20" />
            </motion.div>

            {/* arch composition — desktop */}
            <div className="relative mt-14 hidden h-[430px] lg:block">
              <motion.div
                style={{ y: archY }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 1, ease: EASE }}
                className="absolute left-0 top-0 w-[290px]"
              >
                <div className="absolute -inset-3 rounded-t-full rounded-b-[28px] border border-sage/25" />
                <div className="overflow-hidden rounded-t-full rounded-b-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG_MAIN}
                    alt="Người làm vườn chăm sóc hoa tại nhà kính Dalat Hasfarm"
                    className="h-[380px] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.06]"
                    loading="lazy"
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 h-28 rounded-b-3xl bg-gradient-to-t from-pine/70 to-transparent" />
                <span className="absolute bottom-5 left-6 right-6 text-[10px] uppercase tracking-[0.24em] text-cream/85">
                  Vườn hoa Đà Lạt — nơi mỗi ngày bắt đầu
                </span>
              </motion.div>

              <motion.div
                style={{ y: badgeY }}
                initial={{ opacity: 0, rotate: -4, y: 30 }}
                animate={{ opacity: 1, rotate: -6, y: 0 }}
                transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
                className="absolute left-[300px] top-16 w-[190px]"
              >
                <div className="rotate-0 rounded-2xl border border-cream/15 bg-moss/80 p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={IMG_SECOND}
                    alt="Cánh đồng hoa Đà Lạt"
                    className="h-[150px] w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  <p className="px-1 pb-1 pt-2.5 text-center font-display text-[12.5px] italic text-cream/80">
                    “Nơi làm việc đẹp bắt đầu từ tiếng nói”
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
                className="absolute left-[500px] top-[214px] hidden xl:block"
              >
                <CircleBadge />
              </motion.div>
            </div>

            {/* steps */}
            <div className="mt-12 grid gap-3.5 sm:grid-cols-3 lg:mt-6 xl:mt-10">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.title}
                  custom={5 + i}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="group rounded-2xl border border-cream/10 bg-cream/[0.04] p-4.5 backdrop-blur-sm transition-colors duration-300 hover:border-sage/30 hover:bg-cream/[0.07]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-9 place-items-center rounded-full bg-sage/10 text-sage transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                      <s.icon className="size-4.5" strokeWidth={1.8} />
                    </span>
                    <span className="font-display text-[13px] italic text-cream/30">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-[13.5px] font-semibold text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-cream/55">
                    {s.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* right — form panel */}
        <section className="relative px-3 pb-10 sm:px-5 lg:px-0 lg:pb-6 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] bg-cream px-6 py-9 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.55)] sm:px-9 lg:sticky lg:top-4 lg:mb-4 lg:px-10 lg:py-11"
          >
            {/* top accent */}
            <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-leaf via-sage to-gold" />
            <Flower2
              className="pointer-events-none absolute -right-8 -top-8 size-40 -rotate-12 text-pine/[0.045]"
              strokeWidth={1}
            />

            <div className="relative mb-9">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-leaf">
                Phiếu ghi nhận ý kiến
              </p>
              <h2 className="mt-3 font-display text-[30px] leading-tight text-pine sm:text-[34px]">
                Chia sẻ điều bạn{" "}
                <em className="italic text-clay">đang trăn trở</em>
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: ShieldCheck, text: "Bảo mật tuyệt đối" },
                  { icon: Clock4, text: "Phản hồi trong 48h" },
                  { icon: Mailbox, text: "Gửi thẳng đến quản lý" },
                ].map((c) => (
                  <span
                    key={c.text}
                    className="flex items-center gap-1.5 rounded-full border border-pine/10 bg-paper px-3 py-1.5 text-[10.5px] font-medium text-bark"
                  >
                    <c.icon className="size-3.5 text-leaf" />
                    {c.text}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <FeedbackForm />
            </div>
          </motion.div>
        </section>
      </main>

      <Marquee />

      {/* ── footer ─────────────────────────────── */}
      <footer className="relative bg-pine">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-cream/10 text-sage">
                <Flower2 className="size-4.5" />
              </span>
              <span className="font-display text-lg text-cream">
                Dalat Hasfarm
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[12.5px] leading-relaxed text-cream/50">
              Kênh góp ý – phản hồi nội bộ. Mọi thông tin được bảo mật tuyệt
              đối và chỉ phục vụ mục đích cải thiện môi trường làm việc: văn
              minh, cởi mở và tích cực hơn.
            </p>
          </div>
          <div>
            <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-sage">
              Liên hệ trực tiếp
            </h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-cream/70">
              <li>
                <a
                  href="mailto:anvuong@dalathasfarm.com"
                  className="link-sweep inline-block"
                >
                  anvuong@dalathasfarm.com
                </a>
                <span className="mt-0.5 block text-[10.5px] text-cream/40">
                  Quản lý Tuyển dụng
                </span>
              </li>
              <li>
                <a
                  href="mailto:tuyendung.dalathasfarm@gmail.com"
                  className="link-sweep inline-block"
                >
                  tuyendung.dalathasfarm@gmail.com
                </a>
                <span className="mt-0.5 block text-[10.5px] text-cream/40">
                  Phòng Tuyển dụng
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-sage">
              Cam kết của chúng tôi
            </h4>
            <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-cream/60">
              <li className="flex gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sage" />
                Bảo mật danh tính — bạn có thể góp ý hoàn toàn ẩn danh.
              </li>
              <li className="flex gap-2.5">
                <PhoneCall className="mt-0.5 size-4 shrink-0 text-sage" />
                Mọi ý kiến đều được đọc và phản hồi trực tiếp nếu bạn để lại
                liên hệ.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-2 px-5 py-5 text-[10.5px] uppercase tracking-[0.2em] text-cream/35 sm:flex-row sm:px-8 lg:px-12">
            <span>© 2026 Dalat Hasfarm — Phòng Nhân sự & Tuyển dụng</span>
            <span className="flex items-center gap-2">
              Lắng nghe từ vườn
              <Flower2 className="size-3.5 text-gold/60" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
