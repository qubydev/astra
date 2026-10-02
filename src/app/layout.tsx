import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/navbar";

const crimsonPro = Crimson_Pro({ subsets: ['latin'], variable: '--font-crimson-pro' });
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Astra",
  description: "All in one content creation platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", crimsonPro.variable, inter.variable)}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
