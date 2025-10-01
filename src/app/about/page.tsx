import { AdUnit, MobileAd, ArticleAd } from '../../components/AdSense';
import { ADSENSE_CONFIG } from '../../lib/adsense';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  CurrencyDollarIcon, 
  ScaleIcon, 
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About UnitHub | Professional Unit Converter',
  description: 'Learn about UnitHub - the free, professional unit converter trusted by millions for accurate currency, measurement, and time zone conversions.',
  keywords: 'about unithub, unit converter, conversion tool, free converter, professional tools',
};

export default function AboutPage() {
  const features = [
    {
      icon: CurrencyDollarIcon,
      title: 'Real-Time Currency Conversion',
      description: 'Live exchange rates for 150+ world currencies updated throughout the day'
    },
    {
      icon: ScaleIcon,
      title: 'Comprehensive Measurements',
      description: 'Convert between metric and imperial units across 7 different categories'
    },
    {
      icon: ClockIcon,
      title: 'Global Time Zones',
      description: 'Accurate time zone conversions with live world clock functionality'
    },
    {
      icon: ChartBarIcon,
      title: 'High Precision',
      description: 'Scientific accuracy with proper rounding and significant figures'
    },
    {
      icon: GlobeAltIcon,
      title: 'Mobile Optimized',
      description: 'Responsive design that works perfectly on all devices'
    },
    {
      icon: LightBulbIcon,
      title: 'Educational Resources',
      description: 'Conversion charts, formulas, and learning materials included'
    }
  ];

  const stats = [
    { number: '150+', label: 'World Currencies' },
    { number: '50+', label: 'Measurement Units' },
    { number: '80+', label: 'Time Zones' },
    { number: '100%', label: 'Free to Use' }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                About UnitHub
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                UnitHub is a professional, free unit conversion platform designed to make accurate conversions 
                accessible to everyone. Whether you're a student, professional, or just need quick conversions, 
                we've got you covered.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <div className="text-center">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                  To provide the most accurate, user-friendly, and comprehensive unit conversion tools 
                  that help people around the world work with different measurement systems effortlessly. 
                  We believe that essential tools should be free, accessible, and reliable for everyone.
                </p>
              </div>
            </div>
            {/* In-Article Ad (native, fluid) */}
            <ArticleAd 
              adSlot={ADSENSE_CONFIG.adSlots.article}
              publisherId={ADSENSE_CONFIG.publisherId}
            />

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-12 text-white">
              <h2 className="text-2xl font-bold text-center mb-8">UnitHub by the Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Why Choose UnitHub?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      <feature.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChartBarIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Accuracy First</h3>
                  <p className="text-gray-600">
                    We use the most reliable data sources and algorithms to ensure every conversion 
                    is as accurate as possible.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserGroupIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Centered</h3>
                  <p className="text-gray-600">
                    Every feature is designed with user experience in mind, making conversions 
                    intuitive and efficient.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HeartIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Always Free</h3>
                  <p className="text-gray-600">
                    We believe essential tools should be accessible to everyone, 
                    regardless of their financial situation.
                  </p>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Built with Modern Technology</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  UnitHub is built using cutting-edge web technologies to ensure fast performance, 
                  reliability, and security:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Next.js 15 with React</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Responsive design principles</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Data & APIs</h3>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Real-time exchange rate APIs</li>
                      <li>• Scientific conversion algorithms</li>
                      <li>• Comprehensive timezone database</li>
                      <li>• Caching for optimal performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Questions or Feedback?</h2>
              <p className="text-green-100 mb-6">
                We'd love to hear from you! Whether you have suggestions, questions, or just want to say hello.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                >
                  Get in Touch
                </Link>
                <a
                  href="mailto:younaskk120@gmail.com"
                  className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                >
                  Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}