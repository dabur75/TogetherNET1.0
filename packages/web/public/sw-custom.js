/**
 * Custom Service Worker for TogetherNet PWA
 * Handles therapeutic push notifications and offline functionality
 */

// Import Workbox for PWA functionality
importScripts('workbox-1be04862.js');

// Workbox manifest placeholder - will be replaced during build
const manifest = self.__WB_MANIFEST;

const CACHE_NAME = 'togethernet-v1';
const urlsToCache = [
  '/',
  '/manifest.webmanifest',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
];

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('TogetherNet Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('TogetherNet Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Push event - handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let notificationData = {
    title: 'TogetherNet',
    body: 'Your HeartBank is ready for today\'s deposit',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: 'gentle-reminder',
  };

  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = { ...notificationData, ...data };
    } catch (e) {
      console.error('Failed to parse push data:', e);
    }
  }

  // Add therapeutic messaging based on time of day
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) {
    notificationData.title = 'Good morning 🌅';
    notificationData.body = 'Today\'s exercise is ready when you are';
  } else if (hour >= 12 && hour < 18) {
    notificationData.title = 'Gentle reminder 💛';
    notificationData.body = 'Your HeartBank is open whenever you\'re ready';
  } else {
    notificationData.title = 'Evening check-in 🌙';
    notificationData.body = 'Even surviving today is worth depositing';
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: false,
      actions: [
        {
          action: 'open-app',
          title: 'Open HeartBank',
          icon: '/pwa-192x192.png',
        },
        {
          action: 'snooze',
          title: 'Remind later',
          icon: '/pwa-192x192.png',
        },
      ],
      data: {
        url: '/',
        timestamp: Date.now(),
      },
    })
  );
});

// Notification click - handle user interaction
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  if (action === 'snooze') {
    // Schedule another notification in 2 hours
    setTimeout(() => {
      self.registration.showNotification('Gentle reminder', {
        body: 'Your HeartBank is still open',
        icon: '/pwa-192x192.png',
        tag: 'snooze-reminder',
      });
    }, 2 * 60 * 60 * 1000); // 2 hours
    return;
  }

  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(data.url) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new window if app is not open
        if (clients.openWindow) {
          return clients.openWindow(data.url);
        }
      })
  );
});

// Background sync for offline deposits
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'deposit-sync') {
    event.waitUntil(syncOfflineDeposits());
  }
});

// Sync offline deposits when connection is restored
async function syncOfflineDeposits() {
  try {
    // Get offline deposits from IndexedDB
    const offlineDeposits = await getOfflineDeposits();
    
    for (const deposit of offlineDeposits) {
      try {
        // Attempt to sync deposit to Firebase
        await syncDepositToFirebase(deposit);
        
        // Remove from offline storage after successful sync
        await removeOfflineDeposit(deposit.id);
        
        console.log('Deposit synced successfully:', deposit.id);
      } catch (error) {
        console.error('Failed to sync deposit:', deposit.id, error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Helper functions for offline storage
async function getOfflineDeposits() {
  // Implementation would use IndexedDB to retrieve offline deposits
  return [];
}

async function syncDepositToFirebase(deposit) {
  // Implementation would sync deposit to Firebase
  console.log('Syncing deposit:', deposit);
}

async function removeOfflineDeposit(depositId) {
  // Implementation would remove synced deposit from IndexedDB
  console.log('Removing offline deposit:', depositId);
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SCHEDULE_REMINDER') {
    scheduleGentleReminder(event.data.payload);
  }
});

// Schedule gentle reminders
function scheduleGentleReminder(reminderData) {
  const { time, message, type } = reminderData;
  
  // Calculate delay until reminder time
  const now = new Date();
  const reminderTime = new Date(time);
  const delay = reminderTime.getTime() - now.getTime();
  
  if (delay > 0) {
    setTimeout(() => {
      self.registration.showNotification('TogetherNet Gentle Reminder', {
        body: message,
        icon: '/pwa-192x192.png',
        tag: `reminder-${type}`,
        requireInteraction: false,
      });
    }, delay);
  }
}

console.log('TogetherNet Service Worker loaded successfully');