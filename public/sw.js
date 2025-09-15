const CACHE_NAME = 'unithub-v1';
const urlsToCache = [
  '/',
  '/currency-converter',
  '/length-converter',
  '/weight-converter',
  '/temperature-converter',
  '/area-converter',
  '/volume-converter',
  '/speed-converter',
  '/time-converter',
  '/about',
  '/privacy',
  '/terms',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for currency rates
self.addEventListener('sync', (event) => {
  if (event.tag === 'currency-sync') {
    event.waitUntil(syncCurrencyRates());
  }
});

async function syncCurrencyRates() {
  try {
    // This would sync with your currency API when connection is restored
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    // Store in IndexedDB or send to main thread
    console.log('Currency rates synced:', data);
  } catch (error) {
    console.log('Currency sync failed:', error);
  }
}

// Push notifications (optional feature)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New currency rates available!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'currency-update',
    actions: [
      {
        action: 'view',
        title: 'View Converter',
        icon: '/favicon.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('UnitHub Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/currency-converter')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});