import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Góp Ý & Phản Hồi — Dalat Hasfarm",
  description:
    "Kênh góp ý nội bộ của Dalat Hasfarm. Mọi ý kiến đều được lắng nghe, bảo mật tuyệt đối và chuyển trực tiếp đến quản lý tuyển dụng.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d211a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${playfair.variable} ${beVietnam.variable}`}>
      <body className="font-sans bg-pine text-ink antialiased grain">
        {children}
      </body>
    </html>
  );
}
