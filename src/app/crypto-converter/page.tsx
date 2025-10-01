"use client";

import { useState, useCallback, useEffect } from "react";
import { getCryptocurrencies, CurrencyData } from "@/lib/currency";
import { cryptoAPI } from "@/lib/cryptoAPI";
import { ArrowsRightLeftIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import MobileBackButton from "@/components/MobileBackButton";
import { AdUnit, MobileAd } from "@/components/AdSense";
import { ADSENSE_CONFIG } from "@/lib/adsense";

export default function CryptoConverter() {
  const [isClient, setIsClient] = useState(false);
  const cryptoCurrencies = getCryptocurrencies();
  const [amount, setAmount] = useState<string>("1");
  const [fromCrypto, setFromCrypto] = useState("BTC");
  const [toCrypto, setToCrypto] = useState("ETH");
  const [result, setResult] = useState<null | { convertedAmount: number; rate: number; isLive: boolean; error?: string }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const swapCryptos = () => {
    setFromCrypto(toCrypto);
    setToCrypto(fromCrypto);
  };

  const performConversion = useCallback(async () => {
    if (!isClient) return;
    
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0 || isNaN(numAmount)) {
      setResult(null);
      setError("");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const conversion = await cryptoAPI.convertCrypto(numAmount, fromCrypto, toCrypto);
      setResult(conversion);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCrypto, toCrypto, isClient]);

  return (
    <>
      {/* Desktop Header Ad */}
      <div className="hidden lg:block py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AdUnit 
            adSlot={ADSENSE_CONFIG.adSlots.header}
            adFormat="banner"
            publisherId={ADSENSE_CONFIG.publisherId}
            className="mx-auto desktop-banner"
            style={{ display: 'block', width: '728px', height: '90px', minWidth: '728px', minHeight: '90px', margin: '0 auto' }}
          />
        </div>
      </div>
      {/* Mobile Sticky Ad */}
      <MobileAd adSlot={ADSENSE_CONFIG.adSlots.mobileSticky} publisherId={ADSENSE_CONFIG.publisherId} />
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* ...existing code... */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Mobile Back Button */}
        <div className="md:hidden mb-4">
          <MobileBackButton fallbackUrl="/" />
        </div>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <ChartBarIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cryptocurrency Converter
            </h1>
          </div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Convert between cryptocurrencies with real-time exchange rates
          </p>
        </div>
          
        <main>
          {!isClient ? (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <div className="animate-pulse text-lg">Loading crypto converter...</div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:items-end">
                {/* From Crypto Section */}
                <div className="space-y-4 order-1 lg:order-1">
                  <label className="block text-sm font-medium text-gray-300">Amount</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-4 py-3 text-lg rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent touch-target"
                    inputMode="decimal"
                    placeholder="Enter amount"
                  />
                  <label className="block text-sm font-medium text-gray-300">From Cryptocurrency</label>
                  <select
                    value={fromCrypto}
                    onChange={e => setFromCrypto(e.target.value)}
                    className="w-full px-4 py-3 text-lg rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent touch-target"
                  >
                    {cryptoCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Swap Button */}
                <div className="flex lg:items-center justify-center order-3 lg:order-2">
                  <button
                    onClick={swapCryptos}
                    className="p-4 border-2 border-green-400 rounded-full hover:border-green-300 hover:bg-green-900 transition-all transform hover:scale-105 active:scale-95 touch-target"
                    title="Swap cryptocurrencies"
                    aria-label="Swap cryptocurrencies"
                  >
                    <ArrowsRightLeftIcon className="w-6 h-6 text-green-400 lg:rotate-90" />
                  </button>
                </div>

                {/* To Crypto Section */}
                <div className="space-y-4 order-2 lg:order-3">
                  <label className="block text-sm font-medium text-gray-300">To Cryptocurrency</label>
                  <select
                    value={toCrypto}
                    onChange={e => setToCrypto(e.target.value)}
                    className="w-full px-4 py-3 text-lg rounded-lg border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent touch-target"
                  >
                    {cryptoCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Convert Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={performConversion}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95 touch-target text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Converting...
                    </div>
                  ) : (
                    'Convert Crypto'
                  )}
                </button>
              </div>

              {/* Result Display */}
              <div className="p-4 sm:p-6 bg-gray-900 rounded-lg border border-gray-700">
                <h3 className="font-semibold mb-3 flex items-center text-green-400">
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  Conversion Result:
                </h3>
                {isLoading ? (
                  <div className="flex items-center text-gray-300">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                    Converting...
                  </div>
                ) : result ? (
                  <div className="space-y-2">
                    <div className="text-xl sm:text-2xl font-bold text-green-400">
                      {amount} {fromCrypto} = {result.convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} {toCrypto}
                    </div>
                    <div className="text-sm text-gray-400">
                      Rate: 1 {fromCrypto} = {result.rate.toLocaleString(undefined, { maximumFractionDigits: 8 })} {toCrypto}
                    </div>
                    <div className="flex items-center text-xs">
                      <div className={`w-2 h-2 rounded-full mr-2 ${result.isLive ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                      <span className={result.isLive ? 'text-green-400' : 'text-yellow-400'}>
                        {result.isLive ? 'Live Rates' : 'Offline Rates'}
                      </span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-red-400 font-semibold">{error}</div>
                ) : (
                  <div className="text-gray-400">Enter amount and select cryptocurrencies to convert.</div>
                )}
              </div>

              {/* In-Content Ad */}
              <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700" style={{ minHeight: '120px' }}>
                <div className="text-center text-gray-400 text-sm mb-2">Advertisement</div>
                <AdUnit 
                  adSlot={ADSENSE_CONFIG.adSlots.inContent}
                  adFormat="banner"
                  publisherId={ADSENSE_CONFIG.publisherId}
                  className="text-center"
                  style={{
                    display: 'block',
                    width: '320px',
                    height: '100px',
                    minWidth: '320px',
                    minHeight: '100px',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>
          )}
        </main>

        {/* Mobile Sticky Ad */}
        <MobileAd 
          adSlot={ADSENSE_CONFIG.adSlots.mobileSticky}
          publisherId={ADSENSE_CONFIG.publisherId}
        />
      </div>
    </div>
    </>
  );
}
