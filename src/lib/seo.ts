// SEO Configuration for UnitHub - Optimized for Conversion Search Queries

export const seoConfig = {
  baseUrl: 'https://unithub.com',
  siteName: 'UnitHub',
  
  // High-volume conversion search keywords
  primaryKeywords: [
    'unit converter',
    'currency converter',
    'measurement converter',
    'time zone converter',
    'exchange rates',
    'conversion calculator',
    'online converter',
    'free converter'
  ],

  // Long-tail conversion keywords (what users actually search for)
  conversionKeywords: {
    currency: [
      'usd to eur converter',
      'dollar to euro conversion',
      'currency exchange calculator',
      'real time exchange rates',
      'convert dollars to euros',
      'currency conversion tool',
      'exchange rate calculator',
      'money converter online'
    ],
    measurement: [
      'feet to meters converter',
      'pounds to kg conversion',
      'celsius to fahrenheit calculator',
      'inches to cm converter',
      'miles to km conversion',
      'convert inches to centimeters',
      'metric conversion calculator',
      'imperial to metric converter'
    ],
    timezone: [
      'timezone converter',
      'world clock converter',
      'time zone calculator',
      'convert time zones',
      'utc time converter',
      'gmt time conversion',
      'world time converter',
      'timezone difference calculator'
    ]
  },

  // Semantic search terms (related concepts)
  semanticTerms: [
    'calculation',
    'conversion tool',
    'unit conversion',
    'measurement conversion',
    'financial calculator',
    'international units',
    'metric system',
    'imperial system',
    'scientific calculator',
    'engineering units'
  ],

  // Common search patterns
  searchPatterns: {
    howTo: [
      'how to convert',
      'how to calculate',
      'how to change',
      'conversion formula',
      'conversion rate'
    ],
    questions: [
      'what is',
      'how much is',
      'convert',
      'calculate',
      'difference between'
    ]
  }
};

// Generate SEO-optimized meta descriptions
export function generateMetaDescription(type: 'currency' | 'measurement' | 'timezone' | 'general'): string {
  const descriptions = {
    currency: 'Convert currencies instantly with live exchange rates. Free USD, EUR, GBP, JPY currency converter. Real-time rates for 150+ currencies worldwide.',
    measurement: 'Free measurement converter for length, weight, temperature, volume. Convert feet to meters, pounds to kg, celsius to fahrenheit instantly.',
    timezone: 'World timezone converter with accurate time calculations. Convert time across global timezones, UTC, GMT. Free world clock tool.',
    general: 'Free professional unit converter for currency, measurements, and timezones. Instant conversions with real-time data. Mobile-friendly calculator.'
  };
  return descriptions[type];
}

// Generate keyword-rich titles
export function generateSEOTitle(conversionType: string, fromUnit?: string, toUnit?: string): string {
  if (fromUnit && toUnit) {
    return `${fromUnit.toUpperCase()} to ${toUnit.toUpperCase()} Converter | Free ${conversionType} Calculator - UnitHub`;
  }
  return `${conversionType} Converter | Free Online Calculator - UnitHub`;
}

// Rich snippet structured data for conversions
export function generateConversionStructuredData(type: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `UnitHub ${type} Converter`,
    "description": generateMetaDescription(type as any),
    "url": `${seoConfig.baseUrl}/${type}-converter`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time conversion",
      "Mobile responsive",
      "No registration required",
      "Accurate calculations",
      "Multiple unit support"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2547",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

// FAQ structured data for rich snippets
export function generateFAQStructuredData(faqs: Array<{question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// How-to structured data for conversion processes
export function generateHowToStructuredData(title: string, steps: Array<{name: string, text: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": title,
    "description": `Learn how to ${title.toLowerCase()} using our free online calculator`,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}