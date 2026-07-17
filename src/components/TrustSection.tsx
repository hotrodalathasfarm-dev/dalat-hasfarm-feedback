"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Ear, Sparkles } from "lucide-react";

const CARDS = [
  {
    icon: ShieldCheck,
    title: "Bảo mật",
    desc: "Danh tính của bạn được bảo vệ tuyệt đối, có thể góp ý hoàn toàn ẩn danh.",
  },
  {
    icon: Ear,
    title: "Lắng nghe",
    desc: "Mỗi ý kiến đều được ghi nhận và chuyển trực tiếp đến người phụ trách.",
  },
  {
    icon: Sparkles,
    title: "Cải thiện",
    desc: "Góp ý của bạn là cơ sở để chúng tôi cải thiện môi trường làm việc.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.7, ease: EASE },
  }),
};

export default function TrustSection() {
  return (
    <div className="mt-12 grid gap-3.5 sm:grid-cols-3 lg:mt-6 xl:mt-10">
      {CARDS.map((c, i) => (
        <motion.div
          key={c.title}
          custom={i}
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="group rounded-[var(--radius-input)] border border-border bg-card p-4.5 shadow-[var(--shadow-soft)] transition-colors duration-300 hover:border-primary/30"
        >
          <span className="grid size-9 place-items-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
            <c.icon className="size-4.5" strokeWidth={1.8} />
          </span>
          <h3 className="mt-3.5 text-[13.5px] font-semibold text-text">
            {c.title}
          </h3>
          <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
            {c.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
