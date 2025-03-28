import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { MoneyProvider } from "@/lib/hooks/useMoney";
import { ReverbProvider } from "@/lib/hooks/useReverb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Droplet",
  description: "where hope goes to die.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.className} antialiased`}
        cz-shortcut-listen="true"
      >
        <MoneyProvider>
            {children}
        </MoneyProvider>
      </body>
    </html>
  );
}
