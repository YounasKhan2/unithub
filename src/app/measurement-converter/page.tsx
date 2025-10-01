"use client";

import { AdUnit, MobileAd } from '../../components/AdSense';
import { ADSENSE_CONFIG } from '../../lib/adsense';

import { useState, useEffect } from 'react';
import { 
  ScaleIcon, 
  ArrowsRightLeftIcon,
  Square3Stack3DIcon,
  FireIcon,
  BeakerIcon,
  RectangleStackIcon,
  BoltIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { measurementCategories, convertRealTime, getCommonConversions } from '@/lib/measurements';
import MobileBackButton from '@/components/MobileBackButton';

const categoryIcons = {
  length: Square3Stack3DIcon,
  weight: ScaleIcon,
  temperature: FireIcon,
  volume: BeakerIcon,
  area: RectangleStackIcon,
  speed: ArrowTrendingUpIcon,
  energy: BoltIcon,
};

const categoryColors = {
  length: 'bg-blue-50 text-blue-600 border-blue-200',
  weight: 'bg-green-50 text-green-600 border-green-200',
  temperature: 'bg-red-50 text-red-600 border-red-200',
  volume: 'bg-purple-50 text-purple-600 border-purple-200',
  area: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  speed: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  energy: 'bg-orange-50 text-orange-600 border-orange-200',
};

export default function MeasurementConverter() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof measurementCategories>('length');
  const [amount, setAmount] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  const currentCategory = measurementCategories[activeCategory];
  const units = currentCategory.units;

  // Real-time conversion with debouncing
  useEffect(() => {
    setIsCalculating(true);
    setError('');

    const timeoutId = setTimeout(() => {
      const conversion = convertRealTime(amount, fromUnit, toUnit, activeCategory);
      
      if (conversion.error) {
        setError(conversion.error);
        setResult('');
      } else {
        setResult(conversion.result);
        setError('');
      }
      
      setIsCalculating(false);
    }, 150); // Short debounce for real-time feel

    return () => clearTimeout(timeoutId);
  }, [amount, fromUnit, toUnit, activeCategory]);

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result && !error) {
      setAmount(result);
    }
  };

  const selectQuickAmount = (value: string) => {
    setAmount(value);
  };

  const handleCategoryChange = (category: keyof typeof measurementCategories) => {
    setActiveCategory(category);
    const newUnits = Object.keys(measurementCategories[category].units);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
    setResult('');
    setError('');
  };

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        {/* ...existing code... */}
   
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Back Button */}
        <div className="md:hidden mb-4">
          <MobileBackButton fallbackUrl="/" />
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full mb-4 sm:mb-6">
            <ScaleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Measurement Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Convert between different units of measurement with high precision. 
            Supports length, weight, temperature, volume, area, speed, and energy.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 mobile-card-enhanced">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 mobile-subtitle-enhanced">Select Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
              {Object.entries(measurementCategories).map(([key, category]) => {
                const IconComponent = categoryIcons[key as keyof typeof categoryIcons];
                const colorClass = categoryColors[key as keyof typeof categoryColors];
                
                return (
                  <button
                    key={key}
                    onClick={() => handleCategoryChange(key as keyof typeof measurementCategories)}
                    className={`mobile-touch-feedback p-2 sm:p-3 rounded-lg border-2 transition-all touch-target ${
                      activeCategory === key
                        ? colorClass + ' transform scale-105 shadow-md'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1" />
                    <div className="font-medium text-xs sm:text-sm leading-tight">{category.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg mobile-error-enhanced">
              <div className="flex items-center gap-2 text-red-700">
                <span className="text-sm sm:text-base">{error}</span>
              </div>
            </div>
          )}

          {/* Quick Amount Buttons */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              Quick amounts
            </label>
            <div className="flex flex-wrap gap-2">
              {['1', '10', '100', '1000'].map((value) => (
                <button
                  key={value}
                  onClick={() => selectQuickAmount(value)}
                  className={`mobile-touch-feedback px-3 sm:px-4 py-2 rounded-lg border transition-all transform hover:scale-105 ${
                    amount === value
                      ? 'bg-green-600 text-white border-green-600 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:shadow-sm'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* Converter Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end">
            {/* From Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <div className="space-y-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mobile-input-enhanced w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-base sm:text-lg"
                  placeholder="Enter amount"
                  step="any"
                  inputMode="decimal"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="mobile-select-enhanced w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {Object.entries(units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center order-last md:order-none">
              <button
                onClick={swapUnits}
                className="mobile-touch-feedback w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
                title="Swap units"
                aria-label="Swap units"
              >
                <ArrowsRightLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
              </button>
            </div>

            {/* To Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={result || '0'}
                    readOnly
                    className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base sm:text-lg font-semibold text-gray-900 mobile-result-enhanced"
                  />
                  {isCalculating && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="mobile-spinner-enhanced w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="mobile-select-enhanced w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {Object.entries(units).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Conversion Formula */}
          {result && !error && (
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg mobile-success-enhanced mobile-fade-in">
              <div className="text-sm sm:text-base text-gray-600">
                <strong>Result:</strong> {amount} {units[fromUnit]?.symbol} = {result} {units[toUnit]?.symbol}
              </div>
            </div>
          )}
        </div>

        {/* Common Conversions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Common {currentCategory.name} Conversions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getCommonConversions(activeCategory).map((conv, index) => (
              <button
                key={index}
                onClick={() => {
                  setFromUnit(conv.from);
                  setToUnit(conv.to);
                  setAmount('1');
                }}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="font-medium text-gray-900">{conv.example}</div>
                <div className="text-sm text-gray-600">{conv.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Precision Info */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            High-Precision Calculations
          </h3>
          <p className="text-gray-600 mb-2">
            Our converter uses scientifically accurate conversion factors with up to {currentCategory.precision} decimal places precision.
          </p>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Current category:</span> {currentCategory.name} • 
            <span className="font-medium ml-2">Base unit:</span> {units[currentCategory.baseUnit]?.name} ({units[currentCategory.baseUnit]?.symbol})
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-lg max-w-none bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Precise Unit Conversions for All Measurements
          </h2>
          <p className="text-gray-600 mb-4">
            Our measurement converter provides scientifically accurate conversions for length, weight, temperature, 
            volume, area, speed, and energy units. Whether you're working on engineering projects, cooking, 
            scientific calculations, or everyday tasks, get precise results for both metric and imperial systems.
          </p>
          <p className="text-gray-600">
            Convert between meters and feet, kilograms and pounds, Celsius and Fahrenheit, liters and gallons, 
            and many more specialized units. All conversion formulas are mathematically accurate and regularly 
            validated for precision, supporting everything from nanometers to light-years.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}