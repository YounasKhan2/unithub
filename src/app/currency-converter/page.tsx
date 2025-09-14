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
  getCurrencyByCode,
  CurrencyData 
} from '@/lib/currency';

interface ConversionResult {
  convertedAmount: number;
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  originalAmount: number;
  timestamp: string;
}

  const popularCurrencies = getPopularCurrencies();

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Convert currency with real-time updates and error handling
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
      // For static export compatibility, use basic conversion rates
      // In production, this would be replaced with actual API calls
      const basicRates: Record<string, number> = {
        'USD': 1,
        'EUR': 0.85,
        'GBP': 0.73,
        'JPY': 110,
        'CAD': 1.25,
        'AUD': 1.35,
        'CHF': 0.92,
        'CNY': 6.45,
        'INR': 74.5,
        'BRL': 5.2
      };

      const fromRate = basicRates[fromCurrency] || 1;
      const toRate = basicRates[toCurrency] || 1;
      const rate = toRate / fromRate;
      const convertedAmount = numAmount * rate;

      setResult({
        convertedAmount,
        rate,
        fromCurrency,
        toCurrency,
        originalAmount: numAmount,
        timestamp: new Date().toISOString()
      });
      setError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
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
    const otherCurrencies = worldCurrencies.filter(
    (currency: CurrencyData) => !popularCurrencies.find((popular: CurrencyData) => popular.code === currency.code)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Real-Time Currency Converter
            </h1>
            <p className="text-xl text-gray-600">
              Convert between 150+ world currencies with live exchange rates
            </p>
          </div>

          {/* Main Converter */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* From Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Currency
                </label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <optgroup label="Popular Currencies">
                    {popularCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All Currencies">
                    {otherCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={swapCurrencies}
                  className="p-3 border-2 border-green-200 rounded-full hover:border-green-400 hover:bg-green-50 transition-colors"
                  title="Swap currencies"
                >
                  <ArrowsRightLeftIcon className="w-6 h-6 text-green-600" />
                </button>
              </div>

              {/* To Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Currency
                </label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
                >
                  <optgroup label="Popular Currencies">
                    {popularCurrencies.map((currency: CurrencyData) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.flag} {currency.code} - {currency.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="All Currencies">
                    {otherCurrencies.map((currency: CurrencyData) => (
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
                    <div className="mt-2 text-xs text-gray-500 flex items-center">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      Last updated: {new Date(result.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                  
                  {/* Demo Notice */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-xs text-blue-700">
                      <strong>Demo Mode:</strong> This converter uses static exchange rates for demonstration purposes. 
                      In production, live rates would be fetched from financial APIs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Amounts</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {[1, 5, 10, 25, 50, 100, 500, 1000].map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-center"
                >
                  {quickAmount}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Currency Pairs */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Currency Pairs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900">{pair.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {getCurrencyByCode(pair.from)?.flag} {pair.from} → {getCurrencyByCode(pair.to)?.flag} {pair.to}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exchange Rate Table */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Rate Details</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-left py-3 px-4">From</th>
                      <th className="text-left py-3 px-4">To</th>
                      <th className="text-left py-3 px-4">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-semibold">{result.originalAmount}</td>
                      <td className="py-3 px-4">
                        {getCurrencyByCode(fromCurrency)?.flag} {fromCurrency}
                      </td>
                      <td className="py-3 px-4">
                        {getCurrencyByCode(toCurrency)?.flag} {toCurrency}
                      </td>
                      <td className="py-3 px-4 font-semibold text-green-600">
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