import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import App from "@/components/wrappers/auth-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ripple",
  description: "Learning Gamified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}
