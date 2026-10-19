import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const siteUrl = "https://persync.vercel.app";
const pageTitle = "Persync | Arah Bisnis Realistis untuk Side Hustle";
const pageDescription =
  "Temukan arah bisnis mikro atau side hustle berdasarkan modal, waktu, keahlian, dan kondisi nyata Anda.";
const socialImage = `${siteUrl}/assets/persync-og-image.png`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/persync-icon.ico",
    shortcut: "/assets/persync-icon.ico",
    apple: "/assets/persync-icon.ico",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteUrl,
    siteName: "Persync",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Persync - AI Business Advisor untuk arah bisnis realistis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [socialImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${plusJakartaSans.variable}`}>{children}</body>
    </html>
  );
}
