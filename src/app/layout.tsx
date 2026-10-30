import type { Metadata } from "next";
import { Nunito_Sans, Quicksand , DM_Serif_Display } from "next/font/google";
import "./globals.css";

// const nunitoSans = Nunito_Sans({
//   variable: "--font-nunito-sans",
//   subsets: ["latin"],
//   weight: ["400", "600", "700", "800", "900"],
//   display: "swap",
// });


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
    >
      <body className="h-full bg-white antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}