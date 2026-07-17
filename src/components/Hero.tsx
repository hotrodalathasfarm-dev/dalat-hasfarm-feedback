"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flower2, ShieldCheck, Clock4, Mailbox, Leaf } from "lucide-react";
import FeedbackForm from "@/components/feedback-form";
import TrustSection from "@/components/TrustSection";
import Image from "next/image";

const IMG_MAIN = "/hero/greenhouse.jpg";

const IMG_SECOND = "/hero/employee.jpg";

const IMG_WIDE = "/hero/banner.jpg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = {
  hidden: { opacity: 0, y: 34 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.85, ease: EASE },
  }),
};

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const archY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main
      ref={heroRef}
      className="mx-auto grid max-w-[1500px] lg:grid-cols-[1.04fr_1fr] lg:gap-10 lg:px-6 xl:gap-16 xl:px-10"
    >
      {/* left — brand panel */}
      <section className="relative overflow-hidden px-5 pb-14 pt-6 sm:px-8 lg:min-h-[calc(100dvh-96px)] lg:px-12 lg:pt-2">
        {/* decor */}
        <div className="pointer-events-none absolute -left-40 top-24 size-[420px] rounded-full bg-primary/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-[380px] rounded-full bg-primary/[0.05] blur-[110px]" />
        <Leaf
          className="pointer-events-none absolute right-[12%] top-10 hidden size-24 rotate-12 text-primary/[0.06] lg:block"
          strokeWidth={1}
        />

        <div className="relative">
          <motion.p
            custom={0}
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-primary"
          >
            <span className="h-px w-10 bg-primary/50" />
            Chung tay xây dựng môi trường làm việc tốt hơn
          </motion.p>

          <h1 className="mt-6 text-[13.5vw] font-bold leading-[1.06] tracking-tight text-text sm:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]">
            <motion.span
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="block"
            >
              Mỗi ý kiến <span className="text-primary">gieo</span>
            </motion.span>
            <motion.span
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="block"
            >
              một mầm{" "}
              <span className="relative inline-block text-primary">
                thay đổi
                <svg
                  viewBox="0 0 220 14"
                  className="absolute -bottom-2 left-0 w-full text-primary/60"
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
              </span>
            </motion.span>
          </h1>

          <motion.p
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-xl text-[14.5px] leading-[1.85] text-muted"
          >
            Chúng tôi luôn trân trọng từng chia sẻ của bạn — những người đang
            trực tiếp tạo nên giá trị mỗi ngày tại Dalat Hasfarm. Hãy dành ít
            phút để chúng tôi được{" "}
            <span className="font-medium text-text">lắng nghe nhiều hơn</span>,
            hiểu sâu hơn và cải thiện kịp thời hơn — về môi trường làm việc,
            quy trình, điều kiện lao động hay bất kỳ điều gì bạn quan tâm.
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
              alt="Nhà kính hiện đại của Dalat Hasfarm"
              className="h-44 w-full object-cover sm:h-56"
              loading="lazy"
            />
            <span className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-border" />
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
              <div className="absolute -inset-3 rounded-t-full rounded-b-[28px] border border-primary/20" />
              <div className="overflow-hidden rounded-t-full rounded-b-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMG_MAIN}
                  alt="Niềm vui lan tỏa cùng nhau"
                  className="h-[380px] w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <span className="absolute inset-x-0 bottom-0 h-28 rounded-b-3xl bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-5 left-6 right-6 text-[10px] uppercase tracking-[0.24em] text-white/90">
                Dalat Hasfarm — nơi mỗi ngày bắt đầu bằng niềm vui
              </span>
            </motion.div>

            <motion.div
              style={{ y: badgeY }}
              initial={{ opacity: 0, rotate: -4, y: 30 }}
              animate={{ opacity: 1, rotate: -6, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
              className="absolute left-[300px] top-16 w-[190px]"
            >
              <div className="rotate-0 rounded-2xl border border-border bg-card p-2.5 shadow-[var(--shadow-soft)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMG_SECOND}
                  alt="Cánh đồng hoa Đà Lạt"
                  className="h-[150px] w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <p className="px-1 pb-1 pt-2.5 text-center text-[12.5px] italic text-muted">
                  “Mỗi góp ý đều góp phần xây dựng môi trường làm việc tích cực hơn.”
                </p>
              </div>
            </motion.div>
            
          </div>

          <TrustSection />
        </div>
      </section>

      {/* right — form panel */}
      <section className="relative px-3 pb-10 sm:px-5 lg:px-0 lg:pb-6 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card px-6 py-9 shadow-[var(--shadow-soft)] sm:px-9 lg:sticky lg:top-4 lg:mb-4 lg:px-10 lg:py-11"
        >
          {/* top accent */}
          <span className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
          <Flower2
            className="pointer-events-none absolute -right-8 -top-8 size-40 -rotate-12 text-primary/[0.05]"
            strokeWidth={1}
          />

          <div className="relative mb-9">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-primary">
              Phiếu ghi nhận ý kiến
            </p>
            <h2 className="mt-3 text-[30px] font-bold leading-tight text-text sm:text-[34px]">
              Chia sẻ điều bạn{" "}
              <span className="text-primary">đang trăn trở</span>
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, text: "Bảo mật tuyệt đối" },
                { icon: Clock4, text: "Ghi nhận kịp thời" },
                { icon: Mailbox, text: "Gửi thẳng đến PNS" },
              ].map((c) => (
                <span
                  key={c.text}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[10.5px] font-medium text-muted"
                >
                  <c.icon className="size-3.5 text-primary" />
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
  );
}
