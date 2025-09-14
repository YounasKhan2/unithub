import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CalculatorIcon, 
  AcademicCapIcon,
  GlobeAltIcon,
  ChartBarIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Resources & Conversion Charts | UnitHub',
  description: 'Comprehensive unit conversion resources, charts, formulas, and educational content for currency, measurements, and time zones.',
  keywords: 'unit conversion charts, measurement formulas, currency rates, time zone information, conversion resources',
};

export default function ResourcesPage() {
  const conversionCharts = [
    {
      title: 'Length Conversions',
      icon: CalculatorIcon,
      description: 'Comprehensive length and distance conversion charts',
      items: [
        '1 meter = 3.28084 feet',
        '1 kilometer = 0.621371 miles',
        '1 inch = 2.54 centimeters',
        '1 yard = 0.9144 meters',
        '1 nautical mile = 1.852 kilometers'
      ]
    },
    {
      title: 'Weight & Mass',
      icon: CalculatorIcon,
      description: 'Weight and mass conversion reference',
      items: [
        '1 kilogram = 2.20462 pounds',
        '1 pound = 453.592 grams',
        '1 ounce = 28.3495 grams',
        '1 ton (metric) = 1000 kilograms',
        '1 stone = 14 pounds = 6.35029 kg'
      ]
    },
    {
      title: 'Temperature Scales',
      icon: CalculatorIcon,
      description: 'Temperature conversion formulas and references',
      items: [
        'Celsius to Fahrenheit: (°C × 9/5) + 32',
        'Fahrenheit to Celsius: (°F - 32) × 5/9',
        'Celsius to Kelvin: °C + 273.15',
        'Water freezes: 0°C = 32°F = 273.15K',
        'Water boils: 100°C = 212°F = 373.15K'
      ]
    },
    {
      title: 'Volume & Capacity',
      icon: CalculatorIcon,
      description: 'Volume and liquid measurement conversions',
      items: [
        '1 liter = 0.264172 US gallons',
        '1 US gallon = 3.78541 liters',
        '1 US cup = 236.588 milliliters',
        '1 tablespoon = 14.7868 ml',
        '1 cubic meter = 1000 liters'
      ]
    }
  ];

  const currencyResources = [
    {
      title: 'Major Currency Codes',
      items: [
        'USD - United States Dollar',
        'EUR - Euro',
        'GBP - British Pound Sterling',
        'JPY - Japanese Yen',
        'CAD - Canadian Dollar',
        'AUD - Australian Dollar',
        'CHF - Swiss Franc',
        'CNY - Chinese Yuan'
      ]
    },
    {
      title: 'Currency Facts',
      items: [
        'ISO 4217 defines three-letter currency codes',
        'Exchange rates fluctuate based on market conditions',
        'Central banks influence currency values',
        'Forex markets operate 24/5',
        'Currency pairs show relative values'
      ]
    }
  ];

  const timezoneResources = [
    {
      title: 'Time Zone Basics',
      items: [
        'UTC (Coordinated Universal Time) is the global standard',
        'Earth has 24 time zones, each 15° of longitude',
        'Daylight Saving Time shifts clocks forward/backward',
        'International Date Line is roughly at 180° longitude',
        'Some regions use half-hour or quarter-hour offsets'
      ]
    },
    {
      title: 'Business Time Zones',
      items: [
        'EST/EDT: Eastern Time (New York, Toronto)',
        'GMT/BST: Greenwich Mean Time (London)',
        'CET/CEST: Central European Time (Paris, Berlin)',
        'JST: Japan Standard Time (Tokyo)',
        'AEST/AEDT: Australian Eastern Time (Sydney)'
      ]
    }
  ];

  const educationalContent = [
    {
      title: 'Metric vs Imperial Systems',
      description: 'Understanding the differences between measurement systems',
      content: [
        'Metric System: Based on powers of 10, used globally',
        'Imperial System: Traditional system used in US and UK',
        'SI Units: International standard for scientific measurements',
        'Conversion factors help bridge between systems'
      ]
    },
    {
      title: 'Scientific Notation',
      description: 'How to work with very large or very small numbers',
      content: [
        'Express numbers as a × 10^n format',
        'Useful for astronomical distances or atomic measurements',
        'Mantissa (a) is between 1 and 10',
        'Exponent (n) shows the power of 10'
      ]
    },
    {
      title: 'Precision and Accuracy',
      description: 'Understanding measurement quality',
      content: [
        'Precision: How close repeated measurements are',
        'Accuracy: How close to the true value',
        'Significant figures show measurement precision',
        'Rounding rules affect calculation accuracy'
      ]
    }
  ];

  const quickTools = [
    {
      title: 'Currency Converter',
      description: 'Real-time exchange rates for 150+ currencies',
      link: '/currency-converter',
      color: 'bg-green-500'
    },
    {
      title: 'Measurement Converter',
      description: 'Convert between metric and imperial units',
      link: '/measurement-converter',
      color: 'bg-blue-500'
    },
    {
      title: 'Timezone Converter',
      description: 'Convert time between global time zones',
      link: '/timezone-converter',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Conversion Resources & Charts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides, conversion charts, and educational resources to help you master unit conversions
            </p>
          </div>

          {/* Quick Access Tools */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CalculatorIcon className="w-6 h-6 mr-2" />
              Quick Conversion Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.link}
                  className="block p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                    <CalculatorIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Use Tool <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Conversion Charts */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2" />
              Conversion Charts & References
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {conversionCharts.map((chart, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <chart.icon className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">{chart.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{chart.description}</p>
                  <ul className="space-y-2">
                    {chart.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Currency Resources */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <GlobeAltIcon className="w-6 h-6 mr-2" />
              Currency Exchange Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {currencyResources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{resource.title}</h3>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Timezone Resources */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <GlobeAltIcon className="w-6 h-6 mr-2" />
              Time Zone Information
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {timezoneResources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{resource.title}</h3>
                  <ul className="space-y-2">
                    {resource.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2" />
              Educational Content
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {educationalContent.map((content, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{content.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{content.description}</p>
                  <ul className="space-y-2">
                    {content.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <InformationCircleIcon className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Need More Conversion Tools?</h2>
            <p className="text-blue-100 mb-6">
              Try our professional converters for accurate, real-time conversions
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Back to Converters <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}