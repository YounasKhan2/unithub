'use client';

import { useEffect } from 'react';
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
  style = { display: 'block' },
  className = '',
  publisherId
}: AdUnitProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
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
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
      <div className="p-2 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '320px', height: '50px', margin: '0 auto' }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format="banner"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}