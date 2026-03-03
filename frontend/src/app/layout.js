import "./globals.css";
import { DM_Sans } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "NoteVault — Private Temporary Note Sharing",
  description:
    "Share notes securely with auto-expiring access codes. No accounts, no tracking, no data stored beyond expiry. Privacy-first note sharing.",
  robots: "noindex, nofollow",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <meta name="theme-color" content="#faf8f4" />
        <meta name="color-scheme" content="light" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
