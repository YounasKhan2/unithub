import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TouchOptimization from "@/components/MobileOptimizations";
import PWASetup from "@/components/PWASetup";
import ClientOnlyMeta from "@/components/ClientOnlyMeta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | UnitHub - Professional Unit Converter",
    default: "UnitHub - Free Professional Unit Converter | Currency, Measurements & Time Zone",
  },
  description: "Free professional unit converter for currency exchange rates, cryptocurrency conversion, measurements (length, weight, temperature), and time zone conversions. Fast, accurate, and mobile-friendly.",
  keywords: ["unit converter", "currency converter", "cryptocurrency converter", "bitcoin converter", "ethereum converter", "measurement converter", "time zone converter", "exchange rates", "length converter", "weight converter", "temperature converter", "crypto converter"],
  authors: [{ name: "UnitHub" }],
  creator: "UnitHub",
  publisher: "UnitHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://unithub.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "UnitHub - Free Professional Unit & Crypto Converter",
    description: "Free professional unit converter for currency exchange rates, cryptocurrency conversion, measurements, and time zone conversions. Fast, accurate, and mobile-friendly.",
    url: 'https://unithub.com', // Replace with your actual domain
    siteName: 'UnitHub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // We'll create this later
        width: 1200,
        height: 630,
        alt: 'UnitHub - Professional Unit Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "UnitHub - Free Professional Unit & Crypto Converter",
    description: "Free professional unit converter for currency exchange rates, cryptocurrency conversion, measurements, and time zone conversions.",
    images: ['/og-image.jpg'], // We'll create this later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '', // Add your Google Search Console verification code
    yandex: '', // Add if targeting Yandex
    yahoo: '', // Add if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UnitHub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientOnlyMeta />
        <PWASetup />
        <TouchOptimization>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </TouchOptimization>
      </body>
    </html>
  );
}
