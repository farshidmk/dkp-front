import type { Metadata } from "next";
import "./globals.css";
import { vazirFont } from "@/ui/font";
import ApplicationProviders from "@/providers/ApplicationProviders";

export const metadata: Metadata = {
  title: "دیجی تعمیر | Digi Tamir 🔧",
  description: "سفارش و گارانتی از دیجی تعمیر",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="bg-primary">
      <body
        className={`${vazirFont.className} antialiased`}
        suppressHydrationWarning
      >
        <ApplicationProviders>{children}</ApplicationProviders>
      </body>
    </html>
  );
}
