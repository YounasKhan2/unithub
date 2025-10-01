import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TouchOptimization from "@/components/MobileOptimizations";
import PWASetup from "@/components/PWASetup";
import ClientOnlyMeta from "@/components/ClientOnlyMeta";
import AdSense, { AutoAds } from "@/components/AdSense";
import Analytics from "@/components/Analytics";
import Script from "next/script";
import { Suspense } from "react";
import { ADSENSE_CONFIG } from "@/lib/adsense";

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
  // Use env for canonical site URL; ensure NEXT_PUBLIC_SITE_URL is set in hosting env
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "UnitHub - Free Professional Unit & Crypto Converter",
    description: "Free professional unit converter for currency exchange rates, cryptocurrency conversion, measurements, and time zone conversions. Fast, accurate, and mobile-friendly.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    siteName: 'UnitHub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        // Use existing icon as a fallback OG image; replace with a proper 1200x630 image later
        url: '/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'UnitHub - Professional Unit Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "UnitHub - Free Professional Unit & Crypto Converter",
    description: "Free professional unit converter for currency exchange rates, cryptocurrency conversion, measurements, and time zone conversions.",
    images: ['/icon-512x512.png'],
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
        <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/icon-192x192.png" sizes="192x192" type="image/png" />
        <link rel="icon" href="/icon-512x512.png" sizes="512x512" type="image/png" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="UnitHub" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
  {/* AdSense Script */}
        <AdSense publisherId={ADSENSE_CONFIG.publisherId} />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="ga4-script"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ClientOnlyMeta />
        <PWASetup />
        <AutoAds publisherId={ADSENSE_CONFIG.publisherId} />
        <TouchOptimization>
          <Header />
          {process.env.NEXT_PUBLIC_GA_ID ? (
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          ) : null}
          <main className="flex-grow">{children}</main>
          <Footer />
        </TouchOptimization>
      </body>
    </html>
  );
}
