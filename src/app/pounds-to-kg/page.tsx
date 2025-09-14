import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pounds to KG Converter | Lbs to Kilograms Calculator - Free Tool',
  description: 'Convert pounds to kilograms instantly. Free lbs to kg converter with accurate weight calculations. Perfect for fitness, shipping, and international measurements.',
  keywords: 'pounds to kg, lbs to kg, pounds kilograms converter, weight converter, pound kg calculator, lbs kilograms conversion'
};

export default function PoundsToKgConverter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-green-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Pounds to KG Converter
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Convert pounds to kilograms with instant accurate calculations
            </p>
            <p className="text-gray-700">
              Free pounds to kg converter for fitness tracking, shipping calculations, and international weight measurements. 
              Accurate imperial to metric weight conversion.
            </p>
          </div>

          {/* Converter Widget */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Instant Pounds to Kilograms Calculator
              </h2>
              <p className="text-gray-600">
                Convert lbs to kg with precise weight calculations
              </p>
            </div>
            
            <div className="flex justify-center">
              <Link
                href="/measurement-converter?category=weight&from=pounds&to=kilograms"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
              >
                Open Pounds to KG Converter →
              </Link>
            </div>
          </div>

          {/* Conversion Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pounds to KG Conversion Formula
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Formula:</strong> kilograms = pounds × 0.453592</p>
                <p><strong>Example:</strong> 150 lbs × 0.453592 = 68.04 kg</p>
                <p><strong>Quick Reference:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>1 pound = 0.453592 kilograms</li>
                  <li>1 kilogram = 2.20462 pounds</li>
                  <li>1 stone = 6.35029 kilograms</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Common Pounds to KG Conversions
              </h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>1 lb</span>
                  <span>0.45 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>10 lbs</span>
                  <span>4.54 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>50 lbs</span>
                  <span>22.68 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>100 lbs</span>
                  <span>45.36 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>200 lbs</span>
                  <span>90.72 kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pounds to KG Conversion FAQ
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How many kg is 150 pounds?
                </h4>
                <p className="text-gray-700">
                  150 pounds equals 68.04 kilograms. This is calculated as 150 × 0.453592 = 68.04 kg.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What is the exact conversion factor from pounds to kg?
                </h4>
                <p className="text-gray-700">
                  The exact conversion factor is 1 pound = 0.453592 kilograms. This is the internationally 
                  accepted standard for weight conversion.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  When do I need to convert pounds to kg?
                </h4>
                <p className="text-gray-700">
                  Common uses include fitness and weight tracking, medical measurements, shipping and logistics, 
                  international trade, cooking recipes, and scientific calculations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}