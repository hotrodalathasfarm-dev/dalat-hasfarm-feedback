import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Góp Ý & Phản Hồi — Dalat Hasfarm",
  description:
    "Kênh góp ý nội bộ của Dalat Hasfarm. Mọi ý kiến đều được lắng nghe, bảo mật tuyệt đối và chuyển trực tiếp đến quản lý tuyển dụng.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f9f7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="font-sans bg-background text-text antialiased">
        {children}
      </body>
    </html>
  );
}
