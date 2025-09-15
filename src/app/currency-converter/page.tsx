'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  ArrowsRightLeftIcon, 
  CurrencyDollarIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { 
  worldCurrencies, 
  getPopularCurrencies, 
  getCryptocurrencies,
  getFiatCurrencies,
  getCurrencyByCode,
  CurrencyData 
} from '@/lib/currency';
import { currencyAPI } from '@/lib/currencyAPI';

interface ConversionResult {
  convertedAmount: number;
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  originalAmount: number;
  timestamp: string;
  isLive: boolean;
}

  const popularCurrencies = getPopularCurrencies();
  const cryptoCurrencies = getCryptocurrencies();
  const fiatCurrencies = getFiatCurrencies();

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Convert currency with real-time API
  const performConversion = useCallback(async () => {
    const numAmount = parseFloat(amount);
    if (!amount || numAmount <= 0 || isNaN(numAmount)) {
      setResult(null);
      setError('');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use the robust currency API service
      const conversion = await currencyAPI.convertCurrency(numAmount, fromCurrency, toCurrency);

      setResult({
        convertedAmount: conversion.convertedAmount,
        rate: conversion.rate,
        fromCurrency,
        toCurrency,
        originalAmount: numAmount,
        timestamp: new Date().toISOString(),
        isLive: conversion.isLive
      });

      if (conversion.error) {
        setError(conversion.error);
      } else {
        setError('');
      }
    } catch (err) {
      console.error('Currency conversion error:', err);
      setError(err instanceof Error ? err.message : 'Conversion failed');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  // Debounced conversion
  useEffect(() => {
    const timer = setTimeout(performConversion, 300);
    return () => clearTimeout(timer);
  }, [performConversion]);

  // Swap currencies
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Filter currencies for dropdown
  const otherFiatCurrencies = fiatCurrencies.filter(
    (currency: CurrencyData) => !popularCurrencies.find((popular: CurrencyData) => popular.code === currency.code)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Currency & Crypto Converter
            </h1>
            <p className="text-xl text-gray-600">
              Convert between 150+ world currencies and 15 cryptocurrencies with live exchange rates
            </p>
          </div>

          {/* Main Converter */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* From Currency */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all touch-target"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                />
                
                <label className="block text-sm font-medium text-gray-700">
                  From Currency
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent touch-target"
                >
                  <optgroup label="🌟 Popular">
                    {popularCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="₿ Cryptocurrencies">
                    {cryptoCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="💵 Fiat Currencies">
                    {otherFiatCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex lg:items-center justify-center order-3 lg:order-2">
                <button
                  onClick={swapCurrencies}
                  className="p-4 border-2 border-green-200 rounded-full hover:border-green-400 hover:bg-green-50 transition-all transform hover:scale-105 active:scale-95 touch-target"
                  title="Swap currencies"
                  aria-label="Swap currencies"
                >
                  <ArrowsRightLeftIcon className="w-6 h-6 text-green-600 lg:rotate-90" />
                </button>
              </div>

              {/* To Currency */}
              <div className="space-y-4 order-2 lg:order-3">
                <label className="block text-sm font-medium text-gray-700">
                  To Currency
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent touch-target"
                >
                  <optgroup label="🌟 Popular">
                    {popularCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="₿ Cryptocurrencies">
                    {cryptoCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="💵 Fiat Currencies">
                    {otherFiatCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
                
                {/* Result Display */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <ChartBarIcon className="w-4 h-4 mr-1" />
                    Converted Amount:
                  </h3>
                  {isLoading ? (
                    <div className="flex items-center text-gray-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                      Converting...
                    </div>
                  ) : error ? (
                    <div className="flex items-center text-red-600">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {error}
                    </div>
                  ) : result ? (
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {getCurrencyByCode(toCurrency)?.symbol || ''}{result.convertedAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        1 {fromCurrency} = {result.rate.toFixed(4)} {toCurrency}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">Enter amount to see conversion</p>
                  )}
                  
                  {result && (
                    <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                      <div className="flex items-center">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        Last updated: {new Date(result.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-1 ${result.isLive ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`}></div>
                        <span className={`font-medium ${result.isLive ? 'text-green-600' : 'text-orange-600'}`}>
                          {result.isLive ? 'Live Rates' : 'Offline Rates'}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {error && !error.includes('offline') && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <div className="text-xs text-red-700 flex items-center">
                        <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                        <span>{error}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Amounts</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
              {[1, 5, 10, 25, 50, 100, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-center font-medium transform hover:scale-105 active:scale-95 touch-target"
                  aria-label={`Set amount to ${quickAmount}`}
                >
                  {quickAmount >= 1000 ? `${quickAmount/1000}K` : quickAmount}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Currency Pairs */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Popular Currency Pairs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                { from: 'USD', to: 'EUR', name: 'Dollar to Euro' },
                { from: 'USD', to: 'GBP', name: 'Dollar to Pound' },
                { from: 'EUR', to: 'GBP', name: 'Euro to Pound' },
                { from: 'USD', to: 'JPY', name: 'Dollar to Yen' },
                { from: 'USD', to: 'CAD', name: 'Dollar to Canadian Dollar' },
                { from: 'USD', to: 'AUD', name: 'Dollar to Australian Dollar' },
              ].map((pair, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromCurrency(pair.from);
                    setToCurrency(pair.to);
                  }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-left transform hover:scale-105 active:scale-95 touch-target"
                  aria-label={`Convert ${pair.name}`}
                >
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{pair.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {getCurrencyByCode(pair.from)?.flag} {pair.from} → {getCurrencyByCode(pair.to)?.flag} {pair.to}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exchange Rate Table */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Exchange Rate Details</h2>
              <div className="overflow-x-auto mobile-scroll">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-base">Amount</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-base">From</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-base">To</th>
                      <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-base">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base">{result.originalAmount}</td>
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                        <span className="hidden sm:inline">{getCurrencyByCode(fromCurrency)?.flag} </span>{fromCurrency}
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base">
                        <span className="hidden sm:inline">{getCurrencyByCode(toCurrency)?.flag} </span>{toCurrency}
                      </td>
                      <td className="py-3 px-2 sm:px-4 font-semibold text-green-600 text-sm sm:text-base">
                        {result.convertedAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Exchange rate: 1 {fromCurrency} = {result.rate.toFixed(6)} {toCurrency}</p>
                <p>Last updated: {new Date(result.timestamp).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}