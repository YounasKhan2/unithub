export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UnitHub - Free Unit Converter",
    "description": "Free professional unit converter for currency exchange rates, measurements, and time zone conversions. Convert USD to EUR, feet to meters, pounds to kg instantly.",
    "url": "https://unithub.com",
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
    "screenshot": "https://unithub.com/screenshot.jpg",
    "author": {
      "@type": "Organization",
      "name": "UnitHub",
      "url": "https://unithub.com"
    },
    "keywords": "unit converter, currency converter, measurement converter, USD to EUR, feet to meters, pounds to kg, exchange rates, timezone converter"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}