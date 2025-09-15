'use client';

import { useEffect } from 'react';

export default function ClientOnlyMeta() {
  useEffect(() => {
    // Add mobile-specific meta tags on client side to prevent hydration issues
    const existingViewport = document.querySelector('meta[name="viewport"]');
    if (existingViewport) {
      existingViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover');
    }
  }, []);

  return null;
}