'use client';

import { useEffect, useState } from 'react';

export default function PWASetup() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Helper: Detect if running as PWA (standalone mode)
    function isStandalone() {
      if (typeof window === 'undefined') return false;
      // Desktop Chrome/Edge/Opera, Android Chrome, iOS Safari
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.startsWith('android-app://')
      );
    }

    // Register service worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // If running as PWA, do not show any install banners
    if (isStandalone()) {
      return;
    }

    // Handle install prompt
    let deferredPrompt: any;
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
      });
    }

    function showInstallPrompt() {
      if (typeof document === 'undefined') return;
      const installBanner = document.createElement('div');
      installBanner.id = 'install-banner';
      installBanner.className = 'fixed top-4 left-4 right-4 sm:left-6 sm:right-6 bg-green-600 text-white p-3 sm:p-4 rounded-lg shadow-lg z-50 transition-all duration-300';
      installBanner.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1 min-w-0">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <span class="text-sm sm:text-base truncate">Install UnitHub for quick access!</span>
          </div>
          <div class="flex items-center space-x-2 ml-3">
            <button id="install-btn" class="bg-white text-green-600 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors touch-target">
              Install
            </button>
            <button id="dismiss-btn" class="text-white hover:text-gray-200 p-1 touch-target">
              ✕
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(installBanner);
      document.getElementById('install-btn')?.addEventListener('click', () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the install prompt');
            } else {
              console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            installBanner.remove();
          });
        }
      });
      document.getElementById('dismiss-btn')?.addEventListener('click', () => {
        installBanner.remove();
        localStorage.setItem('install-dismissed', 'true');
      });
      setTimeout(() => {
        if (document.getElementById('install-banner')) {
          installBanner.remove();
        }
      }, 10000);
    }

    // Check if already dismissed
    if (typeof localStorage !== 'undefined' && localStorage.getItem('install-dismissed') === 'true') {
      return;
    }

    // iOS install prompt (since iOS doesn't support beforeinstallprompt)
    function isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
    function isInStandaloneMode() {
      if (typeof window === 'undefined') return false;
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      );
    }
    if (isIOS() && !isInStandaloneMode()) {
      setTimeout(() => {
        showIOSInstallPrompt();
      }, 3000);
    }
    function showIOSInstallPrompt() {
      if (typeof document === 'undefined') return;
      const iosPrompt = document.createElement('div');
      iosPrompt.className = 'fixed top-4 left-4 right-4 sm:left-6 sm:right-6 bg-blue-600 text-white p-3 sm:p-4 rounded-lg shadow-lg z-50 transition-all duration-300';
      iosPrompt.innerHTML = `
        <div class="flex items-start">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm sm:text-base">Install UnitHub</p>
            <p class="text-xs sm:text-sm opacity-90 mt-1">
              To install this app, tap the share button 
              <svg class="inline w-3 h-3 sm:w-4 sm:h-4 mx-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
              </svg>
              then "Add to Home Screen"
            </p>
          </div>
          <button class="ml-2 text-white hover:text-gray-200 p-1 touch-target" onclick="this.parentElement.parentElement.remove()">
            ✕
          </button>
        </div>
      `;
      document.body.appendChild(iosPrompt);
      setTimeout(() => {
        if (iosPrompt.parentNode) {
          iosPrompt.remove();
        }
      }, 15000);
    }
  }, [isClient]);

  // Only render on client side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return null;
}