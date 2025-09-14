export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "UnitHub",
    "description": "Free professional unit converter for currency exchange rates, measurements, and time zone conversions",
    "url": "https://unithub.com",
    "applicationCategory": "Utility",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Currency Converter",
      "Measurement Converter", 
      "Time Zone Converter",
      "Real-time Exchange Rates",
      "Mobile Responsive"
    ],
    "screenshot": "https://unithub.com/screenshot.jpg",
    "author": {
      "@type": "Organization",
      "name": "UnitHub"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}