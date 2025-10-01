'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId || typeof window === 'undefined' || typeof window.gtag !== 'function') return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // Send page_view on route changes (GA4)
    window.gtag('config', gaId, {
      page_path: url,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}
