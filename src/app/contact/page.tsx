import { Metadata } from 'next';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  BugAntIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Contact Us | UnitHub',
  description: 'Get in touch with the UnitHub team. Contact us for support, feedback, bug reports, or feature requests.',
  keywords: 'contact, support, feedback, help, customer service, bug report',
};

export default function ContactPage() {
  const contactReasons = [
    {
      icon: QuestionMarkCircleIcon,
      title: 'General Support',
      description: 'Need help using our converters or have questions?',
      email: 'support@unithub.com',
      color: 'bg-blue-500'
    },
    {
      icon: BugAntIcon,
      title: 'Bug Reports',
      description: 'Found an issue or error in our calculations?',
      email: 'bugs@unithub.com',
      color: 'bg-red-500'
    },
    {
      icon: LightBulbIcon,
      title: 'Feature Requests',
      description: 'Have an idea for improving UnitHub?',
      email: 'features@unithub.com',
      color: 'bg-yellow-500'
    },
    {
      icon: HeartIcon,
      title: 'General Feedback',
      description: 'Share your thoughts and suggestions with us',
      email: 'feedback@unithub.com',
      color: 'bg-green-500'
    }
  ];

  const faqs = [
    {
      question: 'How accurate are the conversion rates?',
      answer: 'Our currency conversion rates are sourced from reliable financial APIs and updated regularly. For measurement conversions, we use scientifically accurate conversion factors. However, we recommend verifying critical calculations independently.'
    },
    {
      question: 'Is UnitHub completely free to use?',
      answer: 'Yes! UnitHub is completely free to use. We provide all conversion tools without any subscription fees or hidden costs.'
    },
    {
      question: 'Do you store my conversion data?',
      answer: 'We do not permanently store your conversion inputs. All calculations are processed in real-time and not saved to our servers. Please review our Privacy Policy for more details.'
    },
    {
      question: 'Can I use UnitHub for commercial purposes?',
      answer: 'Yes, you can use UnitHub for both personal and commercial purposes. However, please review our Terms of Service for any limitations and ensure you verify important calculations independently.'
    },
    {
      question: 'How often are exchange rates updated?',
      answer: 'Currency exchange rates are updated multiple times per day through our API providers. The exact frequency depends on market conditions and API availability.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, UnitHub is available as a responsive web application that works great on mobile devices. We are considering developing native mobile apps based on user demand.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We'd love to hear from you! Whether you need support, have feedback, or want to report an issue, we're here to help.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2" />
              How Can We Help?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {contactReasons.map((reason, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <div className={`${reason.color} p-3 rounded-lg mr-4 flex-shrink-0`}>
                      <reason.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-2">{reason.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{reason.description}</p>
                      <a 
                        href={`mailto:${reason.email}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <EnvelopeIcon className="w-4 h-4 mr-1" />
                        {reason.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Contact Info */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                  <p className="text-gray-600">
                    <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                    hello@unithub.com
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                  <p className="text-gray-600">
                    We typically respond to emails within 24-48 hours during business days.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM (UTC)<br />
                    Saturday - Sunday: Limited support
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Mailing Address</h3>
                  <p className="text-gray-600">
                    UnitHub Support Team<br />
                    123 Conversion Street<br />
                    Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Help</h2>
              <div className="space-y-4">
                <Link 
                  href="/resources"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">Conversion Resources</h3>
                  <p className="text-gray-600 text-sm">Access conversion charts, formulas, and guides</p>
                </Link>

                <Link 
                  href="/privacy"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">Privacy Policy</h3>
                  <p className="text-gray-600 text-sm">Learn how we protect your data</p>
                </Link>

                <Link 
                  href="/terms"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">Terms of Service</h3>
                  <p className="text-gray-600 text-sm">Review our terms and conditions</p>
                </Link>

                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Check our Resources page for conversion charts and common questions.
                  </p>
                  <Link 
                    href="/resources"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View Resources →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <QuestionMarkCircleIcon className="w-6 h-6 mr-2" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-blue-100 mb-6">
              Don't hesitate to reach out. We're here to help make your unit conversions accurate and easy.
            </p>
            <a
              href="mailto:hello@unithub.com"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Send Us an Email
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}