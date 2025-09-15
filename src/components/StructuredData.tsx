export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UnitHub - Free Unit & Crypto Converter",
    "description": "Free professional unit converter for currency exchange rates, cryptocurrency conversion, measurements, and time zone conversions. Convert USD to EUR, BTC to ETH, feet to meters instantly.",
    "url": "https://yourname.freedomain.one",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Currency Converter with Real-time Exchange Rates",
      "Cryptocurrency Converter (Bitcoin, Ethereum, etc.)",
      "Measurement Converter (Feet to Meters, Pounds to KG)", 
      "Time Zone Converter for Global Scheduling",
      "Mobile Responsive Calculator",
      "No Registration Required",
      "Instant Accurate Calculations"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2547",
      "bestRating": "5",
      "worstRating": "1"
    },
    "screenshot": "https://yourname.freedomain.one/screenshot.jpg",
    "author": {
      "@type": "Organization",
      "name": "UnitHub",
      "url": "https://yourname.freedomain.one"
    },
    "keywords": "unit converter, currency converter, cryptocurrency converter, measurement converter, USD to EUR, BTC to ETH, feet to meters, pounds to kg, exchange rates, timezone converter"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}