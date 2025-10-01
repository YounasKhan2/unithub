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
import { AdUnit, MobileAd, MultiplexAd } from '@/components/AdSense';
import { ADSENSE_CONFIG } from '@/lib/adsense';

export const metadata: Metadata = {
  title: 'Free Unit Converter | Currency, Measurement & Timezone Calculator - UnitHub',
  description: 'Free online unit converter for currency exchange rates, measurements (feet to meters, pounds to kg), and timezones. Convert USD to EUR, celsius to fahrenheit, and more. Instant accurate calculations.',
  keywords: 'unit converter, currency converter, measurement converter, timezone converter, exchange rates, usd to eur, feet to meters, pounds to kg, celsius to fahrenheit, convert units online, free calculator',
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
      icon: CurrencyDollarIcon,
      title: 'Crypto Converter',
      description: 'Convert Bitcoin, Ethereum, and 13+ major cryptocurrencies with live prices.',
      href: '/crypto-converter',
      color: 'bg-gray-900 text-green-400 border-green-400'
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
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Professional
            </span>
            <br />
            Unit Converter
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Convert currencies, measurements, and time zones with precision. 
            Free, fast, and reliable conversions at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/currency-converter"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 touch-target"
            >
              Start Converting
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm sm:text-base">Trusted by 10,000+ users daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section - After Hero */}
      <section className="hidden lg:block py-6 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AdUnit 
            adSlot={ADSENSE_CONFIG.adSlots.header}
            adFormat="banner"
            publisherId={ADSENSE_CONFIG.publisherId}
            className="mx-auto desktop-banner"
            style={{ 
              display: 'block', 
              width: '728px', 
              height: '90px',
              minWidth: '728px',
              minHeight: '90px',
              margin: '0 auto'
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Convert
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Professional-grade conversion tools for currencies, measurements, and time zones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.slice(0, 2).map((feature, index) => (
              <Link 
                key={index}
                href={feature.href}
                className={`group block p-6 sm:p-8 border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 transform active:scale-95 ${
                  feature.title === 'Crypto Converter' 
                    ? 'bg-gray-900 border-green-400 hover:border-green-300' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0`}>
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className={`text-lg sm:text-xl font-semibold mb-3 text-center sm:text-left ${
                  feature.title === 'Crypto Converter' ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`mb-4 text-center sm:text-left ${
                  feature.title === 'Crypto Converter' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                <div className={`flex items-center justify-center sm:justify-start font-medium group-hover:opacity-80 ${
                  feature.title === 'Crypto Converter' ? 'text-green-400' : 'text-blue-600 group-hover:text-blue-700'
                }`}>
                  Try it now
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}

            {/* Ad Card - Desktop Only (takes up 3rd position) */}
            <div className="hidden lg:block">
              <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl p-4 border border-gray-200" style={{ minHeight: '300px' }}>
                {/* Multiplex AdSense Ad */}
                <MultiplexAd 
                  adSlot={ADSENSE_CONFIG.adSlots.multiplex}
                  publisherId={ADSENSE_CONFIG.publisherId}
                />
              </div>
            </div>
            

            {/* Remaining features */}
            {features.slice(2).map((feature, index) => (
              <Link 
                key={index + 2}
                href={feature.href}
                className={`group block p-6 sm:p-8 border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 transform active:scale-95 ${
                  feature.title === 'Crypto Converter' 
                    ? 'bg-gray-900 border-green-400 hover:border-green-300' 
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg ${feature.color} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto sm:mx-0`}>
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className={`text-lg sm:text-xl font-semibold mb-3 text-center sm:text-left ${
                  feature.title === 'Crypto Converter' ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`mb-4 text-center sm:text-left ${
                  feature.title === 'Crypto Converter' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                <div className={`flex items-center justify-center sm:justify-start font-medium group-hover:opacity-80 ${
                  feature.title === 'Crypto Converter' ? 'text-green-400' : 'text-blue-600 group-hover:text-blue-700'
                }`}>
                  Try it now
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Ad - Below Features */}
          <div className="lg:hidden mt-8 text-center">
            <div style={{ minWidth: '320px', minHeight: '100px', margin: '0 auto' }}>
              <AdUnit 
                adSlot={ADSENSE_CONFIG.adSlots.mobile}
                adFormat="banner"
                publisherId={ADSENSE_CONFIG.publisherId}
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
            Why Choose UnitHub?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

      {/* FAQ Section for SEO */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions About Unit Conversion
              </h2>
              <p className="text-xl text-gray-600">
                Common conversion questions answered by our calculator experts
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I convert USD to EUR with real-time exchange rates?
                </h3>
                <p className="text-gray-700">
                  Use our currency converter to get live USD to EUR exchange rates. Simply enter the amount in US dollars, 
                  select USD as source and EUR as target currency. Our converter uses real-time financial data to provide 
                  accurate exchange rates updated every minute.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What is the easiest way to convert feet to meters?
                </h3>
                <p className="text-gray-700">
                  Our measurement converter makes feet to meters conversion simple. Enter the feet value, select "feet" 
                  as the source unit and "meters" as target. The formula: 1 foot = 0.3048 meters. Perfect for construction, 
                  engineering, and international measurements.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How accurate is the celsius to fahrenheit converter?
                </h3>
                <p className="text-gray-700">
                  Our temperature converter uses the precise formula: °F = (°C × 9/5) + 32. Results are accurate to 
                  multiple decimal places, making it perfect for scientific calculations, cooking, weather, and medical applications.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I convert pounds to kg for weight calculations?
                </h3>
                <p className="text-gray-700">
                  Yes! Our weight converter handles pounds to kilograms conversion instantly. The conversion factor is 
                  1 pound = 0.453592 kilograms. Perfect for fitness tracking, shipping calculations, and international weight measurements.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I convert time zones for international meetings?
                </h3>
                <p className="text-gray-700">
                  Use our timezone converter to schedule meetings across different time zones. Select your local timezone 
                  and target timezone, enter the meeting time, and get the converted time instantly. Supports all global 
                  timezones including EST, PST, GMT, UTC, and more.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is this unit converter free to use?
                </h3>
                <p className="text-gray-700">
                  Yes, UnitHub is completely free! No registration required, no hidden fees, no limits on conversions. 
                  Access all our conversion tools including currency, measurement, and timezone converters without any cost.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What makes UnitHub the best online converter?
                </h3>
                <p className="text-gray-700">
                  UnitHub offers real-time data, mobile-responsive design, no ads, instant calculations, and support for 
                  hundreds of units across all categories. Our converter is fast, accurate, and works offline after initial load.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Ad */}
      <MobileAd 
        adSlot={ADSENSE_CONFIG.adSlots.mobileSticky}
        publisherId={ADSENSE_CONFIG.publisherId}
      />
    </div>
  );
}
