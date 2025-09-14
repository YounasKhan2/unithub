import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CurrencyDollarIcon, 
  ScaleIcon, 
  ClockIcon, 
  ArrowRightIcon,
  StarIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'UnitHub - Free Professional Unit Converter',
  description: 'Convert currencies with real-time exchange rates, measurements (length, weight, temperature), and time zones. Fast, accurate, and mobile-friendly unit converter.',
  keywords: 'unit converter, currency converter, measurement converter, time zone converter, exchange rates',
};

export default function HomePage() {
  const features = [
    {
      icon: CurrencyDollarIcon,
      title: 'Currency Converter',
      description: 'Real-time exchange rates for 150+ currencies with live market data.',
      href: '/currency-converter',
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: ScaleIcon,
      title: 'Measurement Converter',
      description: 'Convert length, weight, temperature, volume, and more with precision.',
      href: '/measurement-converter',
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      icon: ClockIcon,
      title: 'Time Zone Converter',
      description: 'Convert time across global time zones for meetings and travel.',
      href: '/timezone-converter',
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  const benefits = [
    'Free to use forever',
    'Real-time accurate data',
    'Mobile-friendly design',
    'No registration required',
    'Lightning fast conversions',
    'Ad-supported service'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            Unit Converter
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Convert currencies, measurements, and time zones with precision. 
            Free, fast, and reliable conversions at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/currency-converter"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center gap-2"
            >
              Start Converting
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
              <span>Trusted by 10,000+ users daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Convert
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade conversion tools for currencies, measurements, and time zones.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                href={feature.href}
                className="group block p-8 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 rounded-lg ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  Try it now
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Why Choose UnitHub?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckIcon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-lg text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Converting Right Now
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            No sign-up required. Just pick your converter and start using it instantly.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm"
              >
                {feature.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Unit Conversion Made Simple
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600">
              <div>
                <p className="mb-4">
                  UnitHub provides accurate, real-time unit conversions for professionals, students, and everyday users. 
                  Our currency converter uses live exchange rates from major financial markets, ensuring you always get 
                  the most current information for your international transactions.
                </p>
                <p>
                  Whether you're converting measurements for engineering projects, checking exchange rates for travel, 
                  or coordinating meetings across time zones, UnitHub delivers precise results instantly.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  Our measurement converter supports all major units including metric and imperial systems for length, 
                  weight, temperature, volume, area, and more. The time zone converter helps you schedule international 
                  calls and meetings with ease.
                </p>
                <p>
                  Built with modern web technologies, UnitHub works seamlessly on desktop and mobile devices, 
                  providing a fast, responsive experience wherever you need it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
