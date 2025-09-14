import Link from 'next/link';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <HomeIcon className="w-5 h-5" />
            Go to Homepage
          </Link>
          
          <div className="text-sm text-gray-500">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to UnitHub
            </Link>
          </div>
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Converters
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/currency-converter"
              className="text-blue-600 hover:text-blue-700 py-2"
            >
              Currency Converter
            </Link>
            <Link
              href="/measurement-converter"
              className="text-blue-600 hover:text-blue-700 py-2"
            >
              Measurement Converter
            </Link>
            <Link
              href="/timezone-converter"
              className="text-blue-600 hover:text-blue-700 py-2"
            >
              Time Zone Converter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}