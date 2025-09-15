'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface MobileBackButtonProps {
  fallbackUrl?: string;
  label?: string;
  className?: string;
}

export default function MobileBackButton({ 
  fallbackUrl = '/', 
  label = 'Back',
  className = ''
}: MobileBackButtonProps) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if there's history to go back to
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (canGoBack && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <div className={`lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 ${className}`}>
      <div className="flex items-center px-4 py-3">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors touch-target"
          aria-label={label}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      </div>
    </div>
  );
}