import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"]
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"]
});

export const metadata = {
   title: "Vivid Music Dashboard",
   description:
      "Generated to monitor and modify vivid music app datas and structure at admin level."
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
