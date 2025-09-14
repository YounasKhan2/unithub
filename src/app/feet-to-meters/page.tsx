import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Feet to Meters Converter | Ft to M Calculator - Free Tool',
  description: 'Convert feet to meters instantly. Free ft to m converter with accurate calculations. Perfect for construction, engineering, and international measurements.',
  keywords: 'feet to meters, ft to m, feet meters converter, foot meter calculator, feet to metres conversion, imperial to metric'
};

export default function FeetToMetersConverter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Feet to Meters Converter
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Convert feet to meters with instant accurate calculations
            </p>
            <p className="text-gray-700">
              Free feet to meters converter for construction, engineering, sports, and everyday measurements. 
              Accurate imperial to metric conversion.
            </p>
          </div>

          {/* Converter Widget */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Instant Feet to Meters Calculator
              </h2>
              <p className="text-gray-600">
                Convert ft to m with precise calculations
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link
                href="/measurement-converter?category=length&from=feet&to=meters"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                Open Feet to Meters Converter →
              </Link>
            </div>
          </div>

          {/* Conversion Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Feet to Meters Conversion Formula
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Formula:</strong> meters = feet × 0.3048</p>
                <p><strong>Example:</strong> 10 ft × 0.3048 = 3.048 m</p>
                <p><strong>Quick Reference:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>1 foot = 0.3048 meters</li>
                  <li>1 meter = 3.28084 feet</li>
                  <li>1 yard = 0.9144 meters</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Common Feet to Meters Conversions
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>1 ft</span>
                  <span>0.3048 m</span>
                </div>
                <div className="flex justify-between">
                  <span>5 ft</span>
                  <span>1.524 m</span>
                </div>
                <div className="flex justify-between">
                  <span>6 ft</span>
                  <span>1.8288 m</span>
                </div>
                <div className="flex justify-between">
                  <span>10 ft</span>
                  <span>3.048 m</span>
                </div>
                <div className="flex justify-between">
                  <span>100 ft</span>
                  <span>30.48 m</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Feet to Meters Conversion FAQ
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How many meters is 6 feet?
                </h4>
                <p className="text-gray-700">
                  6 feet equals 1.8288 meters. This is calculated as 6 × 0.3048 = 1.8288 meters.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What is the exact conversion factor from feet to meters?
                </h4>
                <p className="text-gray-700">
                  The exact conversion factor is 1 foot = 0.3048 meters. This is the internationally 
                  accepted standard defined by the International System of Units.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  When do I need to convert feet to meters?
                </h4>
                <p className="text-gray-700">
                  Common uses include construction projects, international engineering specifications, 
                  sports measurements, real estate listings, and scientific calculations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}