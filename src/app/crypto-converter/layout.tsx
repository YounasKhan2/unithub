import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cryptocurrency Converter | Bitcoin, Ethereum & Live Crypto Rates - UnitHub',
  description: 'Convert Bitcoin, Ethereum, and 13+ major cryptocurrencies with live market prices. Real-time crypto conversion with BTC, ETH, BNB, ADA, SOL, XRP, and more.',
  keywords: 'cryptocurrency converter, bitcoin converter, ethereum converter, crypto exchange rates, BTC to ETH, live crypto prices, digital currency converter, bitcoin to ethereum, crypto calculator',
  openGraph: {
    title: 'Cryptocurrency Converter | Live Bitcoin & Ethereum Rates',
    description: 'Convert Bitcoin, Ethereum, and 13+ major cryptocurrencies with real-time market prices.',
    type: 'website',
  },
};

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}