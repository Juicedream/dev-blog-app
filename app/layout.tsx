import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dev Blog",
    default: "Dev Blog App",
  },
  description: "The Dev Blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        roboto.variable,
      )}
    >
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="32x32"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
