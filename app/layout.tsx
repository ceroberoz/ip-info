import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IP Info IOTA - Detailed IP and DNS Information Tool",
  description:
    "Get comprehensive insights about your IP address, DNS configuration, and geolocation with IP Info IOTA. A free, user-friendly tool for network diagnostics and location verification.",
  keywords:
    "IP address, DNS, geolocation, network diagnostics, ISP information, AS lookup, IP tracker, internet connection details",
  openGraph: {
    title: "IP Info IOTA - Your Complete IP Information Tool",
    description:
      "Discover detailed information about your IP address, DNS settings, and geographical location with our user-friendly tool.",
    type: "website",
    url: "https://ipinfo.iota.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "IP Info IOTA - Comprehensive IP and DNS Insights",
    description:
      "Get in-depth information about your IP address, DNS configuration, and location. Perfect for network diagnostics and location verification.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
