import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'USD to EUR Converter | Dollar to Euro Exchange Rate Calculator',
  description: 'Convert USD to EUR with live exchange rates. Free dollar to euro converter with real-time rates. Get accurate USD EUR conversion for travel, business, and trading.',
  keywords: 'USD to EUR, dollar to euro, USD EUR converter, dollar euro exchange rate, convert dollars to euros, USD EUR rate, dollar euro calculator'
};

export default function USDToEURConverter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              USD to EUR Converter
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Convert US Dollars to Euros with live exchange rates
            </p>
            <p className="text-gray-700">
              Get real-time USD to EUR exchange rates for accurate currency conversion. 
              Perfect for travel planning, international business, and forex trading.
            </p>
          </div>

          {/* Converter Widget */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Live USD to EUR Exchange Rate
              </h2>
              <p className="text-gray-600">
                Use our advanced currency converter for accurate USD EUR conversion
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link
                href="/currency-converter?from=USD&to=EUR"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                Open USD to EUR Converter →
              </Link>
            </div>
          </div>

          {/* SEO Content */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Use Our USD to EUR Converter?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Real-time exchange rates updated every minute</li>
                <li>• No fees or hidden charges for conversion</li>
                <li>• Accurate calculations with precise decimal places</li>
                <li>• Mobile-friendly responsive design</li>
                <li>• Historical rate trends and charts</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Common USD to EUR Conversions
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>1 USD</span>
                  <span>≈ 0.85 EUR*</span>
                </div>
                <div className="flex justify-between">
                  <span>10 USD</span>
                  <span>≈ 8.50 EUR*</span>
                </div>
                <div className="flex justify-between">
                  <span>100 USD</span>
                  <span>≈ 85.00 EUR*</span>
                </div>
                <div className="flex justify-between">
                  <span>1,000 USD</span>
                  <span>≈ 850.00 EUR*</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  *Rates are approximate and change constantly
                </p>
              </div>
            </div>
          </div>

          {/* FAQ for USD to EUR */}
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              USD to EUR Conversion FAQ
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What is the current USD to EUR exchange rate?
                </h4>
                <p className="text-gray-700">
                  The USD to EUR exchange rate fluctuates constantly based on market conditions. 
                  Use our live converter above to get the most current rate for accurate conversions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How do I convert dollars to euros manually?
                </h4>
                <p className="text-gray-700">
                  To convert USD to EUR, multiply your dollar amount by the current exchange rate. 
                  For example: $100 × 0.85 = €85 (assuming a rate of 0.85).
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Is this USD EUR converter free to use?
                </h4>
                <p className="text-gray-700">
                  Yes, our USD to EUR converter is completely free with no limits on conversions. 
                  No registration required and no hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}