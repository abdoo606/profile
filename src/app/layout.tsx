import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdulrhman - IT Engineer & UI/UX Designer",
  description: "Premium website templates, UI kits, and digital solutions by Abdulrhman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
