import type { Metadata } from "next";
import localFont from "next/font/local";
import { VT323 } from "next/font/google";
import "./globals.css";
import App from "@/components/wrappers/auth-wrapper";

import {Toaster} from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable}`}>
        <App>
          <Toaster position="top-right" />
          {children}
        </App>
      </body>
    </html>
  );
}
