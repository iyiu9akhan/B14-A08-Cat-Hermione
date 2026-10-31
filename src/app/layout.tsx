import type { Metadata } from "next";
import { Quicksand, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import ThemeProvider from "@/components/theme/ThemeProvider";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const quickSand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${quickSand.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="h-full bg-background antialiased m-0 p-0">
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}