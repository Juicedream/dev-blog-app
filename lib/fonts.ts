import { Geist, Geist_Mono, Roboto } from "next/font/google";

export const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
