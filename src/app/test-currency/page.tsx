'use client';

import { useState } from 'react';
import { currencyAPI } from '@/lib/currencyAPI';

export default function CurrencyAPITest() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setResult('Testing currency API...');
    
    try {
      // Test basic conversion
      const conversion = await currencyAPI.convertCurrency(100, 'USD', 'EUR');
      
      setResult(`✅ API Test Successful!
Amount: 100 USD
Converted: ${conversion.convertedAmount.toFixed(2)} EUR
Rate: ${conversion.rate.toFixed(4)}
Live: ${conversion.isLive ? 'Yes' : 'No (Offline)'}
${conversion.error ? `Note: ${conversion.error}` : ''}`);
    } catch (error) {
      setResult(`❌ API Test Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    currencyAPI.clearCache();
    setResult('✅ Cache cleared successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Currency API Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Live Currency Conversion</h2>
          
          <div className="space-y-4">
            <button
              onClick={testAPI}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Testing...' : 'Test 100 USD → EUR'}
            </button>
            
            <button
              onClick={clearCache}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors ml-4"
            >
              Clear Cache
            </button>
          </div>
          
          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="space-y-2 text-gray-700">
            <p>• <strong>Primary API:</strong> ExchangeRate-API (free, no API key required)</p>
            <p>• <strong>Fallback 1:</strong> Fixer.io (if primary fails)</p>
            <p>• <strong>Fallback 2:</strong> Static offline rates (if all APIs fail)</p>
            <p>• <strong>Caching:</strong> 10-minute cache to reduce API calls</p>
            <p>• <strong>Error Handling:</strong> Graceful degradation to offline rates</p>
          </div>
        </div>
      </div>
    </div>
  );
}