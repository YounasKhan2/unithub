'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface AdSenseProps {
  publisherId: string;
}

export default function AdSense({ publisherId }: AdSenseProps) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

// Auto Ads Component
export function AutoAds({ publisherId }: AdSenseProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
          google_ad_client: publisherId,
          enable_page_level_ads: true
        });
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [publisherId]);

  return null;
}

// Manual Ad Unit Component
interface AdUnitProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  publisherId: string;
}

export function AdUnit({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block', minWidth: '320px', minHeight: '50px' },
  className = '',
  publisherId
}: AdUnitProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          } catch (err) {
            console.error('AdSense error:', err);
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }, []);

    if (!isClient) return null;

    return (
      <div className={`adsense-container ${className}`} style={{ minWidth: '320px', minHeight: '50px' }}>
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
        />
      </div>
    );
}

// Mobile Sticky Ad Component
interface MobileAdProps {
  adSlot: string;
  publisherId: string;
}

export function MobileAd({ adSlot, publisherId }: MobileAdProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setIsLoaded(true);
        } catch (err) {
          console.error('AdSense error:', err);
        }
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40" style={{ minHeight: '60px' }}>
      <div className="p-2 text-center">
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block', 
            width: '320px', 
            height: '50px', 
            margin: '0 auto',
            minWidth: '320px',
            minHeight: '50px'
          }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format="banner"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

// In-Article Ad Component (native ad inside content)
interface ArticleAdProps {
  adSlot: string;
  publisherId: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ArticleAd({ adSlot, publisherId, className = '', style }: ArticleAdProps) {
  const [isClient, setIsClient] = useState(false);
  const [pushed, setPushed] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || pushed) return;
    const t = setTimeout(() => {
      try {
        // Only push when adsbygoogle exists
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setPushed(true);
        }
      } catch (err) {
        console.error('AdSense ArticleAd error:', err);
      }
    }, 100);
    return () => clearTimeout(t);
  }, [isClient, pushed]);

  if (!isClient) return null;

  return (
    <div className={`my-8 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minHeight: '100px', ...style }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
      />
    </div>
  );
}

// Multiplex Ad Component (autorelaxed feed)
interface MultiplexAdProps {
  adSlot: string;
  publisherId: string;
  className?: string;
  style?: React.CSSProperties;
}

export function MultiplexAd({ adSlot, publisherId, className = '', style }: MultiplexAdProps) {
  const [isClient, setIsClient] = useState(false);
  const [pushed, setPushed] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient || pushed) return;
    const t = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
          setPushed(true);
        }
      } catch (err) {
        console.error('AdSense MultiplexAd error:', err);
      }
    }, 100);
    return () => clearTimeout(t);
  }, [isClient, pushed]);

  if (!isClient) return null;

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="autorelaxed"
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
      />
    </div>
  );
}