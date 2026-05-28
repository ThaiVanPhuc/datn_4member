import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShopDoan - System Diagrams",
  description: "UML Diagrams for ShopDoan E-commerce Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="bg-[#0a0a0a]">
      <body>{children}</body>
    </html>
  );
}
