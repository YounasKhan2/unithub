import { Metadata } from 'next';
import Link from 'next/link';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Terms of Service | UnitHub',
  description: 'UnitHub Terms of Service - Legal terms and conditions for using our unit conversion services and website.',
  keywords: 'terms of service, legal terms, conditions, user agreement, terms and conditions',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <DocumentTextIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">
              Last updated: September 14, 2025
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to UnitHub. These Terms of Service ("Terms") govern your use of the UnitHub website and services (collectively, the "Service") operated by UnitHub ("us", "we", or "our"). By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                UnitHub provides free online unit conversion services including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Currency conversion with real-time exchange rates</li>
                <li>Measurement conversions (length, weight, temperature, volume, area, speed, energy)</li>
                <li>Time zone conversions and world clock functionality</li>
                <li>Conversion charts and educational resources</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Acceptable Use</h3>
              <p className="text-gray-700 leading-relaxed mb-4">You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated tools to scrape or download data excessively</li>
                <li>Transmit any malicious code or attempt to harm our infrastructure</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Data Accuracy</h3>
              <p className="text-gray-700 leading-relaxed">
                While we strive to provide accurate conversion data, you are responsible for verifying the accuracy of conversions for critical applications. We recommend double-checking important calculations.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of UnitHub and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used without our prior written consent.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 User Content</h3>
              <p className="text-gray-700 leading-relaxed">
                Any feedback, suggestions, or ideas you provide to us regarding the Service may be used by us without restriction or compensation.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
              </p>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Availability</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Uptime and Maintenance</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to maintain high service availability but do not guarantee uninterrupted access. We may perform maintenance, updates, or modifications that may temporarily affect service availability.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Third-Party Dependencies</h3>
              <p className="text-gray-700 leading-relaxed">
                Our Service relies on third-party APIs for exchange rate data. We are not responsible for the availability or accuracy of these external services.
              </p>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimers</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 "As Is" Service</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the Service's operation or availability.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Accuracy Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While we strive for accuracy, we do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Conversion results are completely accurate or up-to-date</li>
                <li>Exchange rates reflect real-time market conditions</li>
                <li>The Service will meet your specific requirements</li>
                <li>The Service will be error-free or uninterrupted</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the maximum extent permitted by applicable law, UnitHub shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Financial losses due to conversion errors</li>
                <li>Damages resulting from service interruptions</li>
                <li>Any other damages arising from your use of the Service</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to defend, indemnify, and hold harmless UnitHub and its affiliates from and against any claims, damages, costs, and expenses (including reasonable attorneys' fees) arising from or related to your use of the Service or violation of these Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law and Jurisdiction</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will remain in full force and effect, and the invalid provision will be replaced with a valid provision that most closely matches the intent of the original.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> younaskk120@gmail.com<br />
                  <strong>Address:</strong> UnitHub Legal Department<br />
                  123 Conversion Street<br />
                  Tech City, TC 12345
                </p>
              </div>
            </section>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to UnitHub
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}