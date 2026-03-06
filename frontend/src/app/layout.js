import "./globals.css";
import { Inter, DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "NoteVault — Private Temporary Note Sharing",
  description:
    "Share notes securely with auto-expiring access codes. No accounts, no tracking, no data stored beyond expiry. Privacy-first note sharing built on zero-trust architecture.",
  robots: "noindex, nofollow",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <head>
        <meta name="theme-color" content="#09090b" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
