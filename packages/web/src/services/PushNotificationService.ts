/**
 * PWA Push Notification Service for TogetherNet
 * Handles gentle reminders for HeartBank deposits
 */

interface NotificationSchedule {
  morning: string; // "06:30" - 30 min after wake time
  afternoon: string; // "14:00" - gentle check-in
  evening: string; // "20:00" - survival deposit option
}

interface GentleReminder {
  title: string;
  body: string;
  icon: string;
  badge: string;
  tag: string;
  requireInteraction: boolean;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

class PushNotificationService {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private vapidPublicKey = 'your-vapid-public-key-here'; // From Firebase

  /**
   * Initialize push notification support
   */
  async initialize(): Promise<boolean> {
    try {
      // Check if service worker and notifications are supported
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.log('Push messaging is not supported');
        return false;
      }

      // Register service worker
      this.swRegistration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', this.swRegistration);

      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  /**
   * Request notification permission with therapeutic context
   */
  async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        console.log('Notification permission granted');
        return true;
      } else {
        console.log('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  /**
   * Subscribe to push notifications
   */
  async subscribeToPush(): Promise<PushSubscription | null> {
    try {
      if (!this.swRegistration) {
        throw new Error('Service worker not registered');
      }

      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey) as BufferSource,
      });

      console.log('Push subscription successful:', subscription);
      return subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  /**
   * Schedule gentle reminders for HeartBank deposits
   */
  async scheduleGentleReminders(schedule: NotificationSchedule): Promise<void> {
    try {
      // Store schedule in localStorage for service worker
      localStorage.setItem('gentleReminderSchedule', JSON.stringify(schedule));

      // Schedule morning reminder
      await this.scheduleNotification('morning', {
        title: 'Today\'s exercise is ready 💛',
        body: 'Your HeartBank is open whenever you\'re ready',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: 'morning-exercise',
        requireInteraction: false,
        actions: [
          {
            action: 'view-exercise',
            title: 'View Exercise',
            icon: '/pwa-192x192.png',
          },
          {
            action: 'snooze',
            title: 'Remind in 2h',
            icon: '/pwa-192x192.png',
          },
        ],
      });

      console.log('Gentle reminders scheduled');
    } catch (error) {
      console.error('Failed to schedule reminders:', error);
    }
  }

  /**
   * Send gentle afternoon check-in
   */
  async sendAfternoonCheckIn(): Promise<void> {
    const reminder: GentleReminder = {
      title: 'Your HeartBank is open',
      body: 'Whenever you\'re ready to make today\'s deposit',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: 'afternoon-checkin',
      requireInteraction: false,
    };

    await this.showNotification(reminder);
  }

  /**
   * Send evening survival deposit option
   */
  async sendEveningSurvivalReminder(): Promise<void> {
    const reminder: GentleReminder = {
      title: 'Even surviving today is worth depositing',
      body: 'Quick survival deposit? You showed up, that counts.',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      tag: 'evening-survival',
      requireInteraction: false,
      actions: [
        {
          action: 'survival-deposit',
          title: 'Quick Deposit',
          icon: '/pwa-192x192.png',
        },
        {
          action: 'tomorrow',
          title: 'Try Tomorrow',
          icon: '/pwa-192x192.png',
        },
      ],
    };

    await this.showNotification(reminder);
  }

  /**
   * Show local notification
   */
  private async showNotification(reminder: GentleReminder): Promise<void> {
    try {
      if (!this.swRegistration) {
        throw new Error('Service worker not registered');
      }

      const notificationOptions: NotificationOptions = {
        body: reminder.body,
        icon: reminder.icon,
        badge: reminder.badge,
        tag: reminder.tag,
        requireInteraction: reminder.requireInteraction,
        data: {
          url: '/',
          timestamp: Date.now(),
        },
      };

      // Add actions if supported
      if (reminder.actions && 'actions' in Notification.prototype) {
        (notificationOptions as any).actions = reminder.actions;
      }

      await this.swRegistration.showNotification(reminder.title, notificationOptions);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }

  /**
   * Schedule notification at specific time
   */
  private async scheduleNotification(
    type: string,
    reminder: GentleReminder
  ): Promise<void> {
    // Store notification for service worker to handle
    const notifications = JSON.parse(
      localStorage.getItem('scheduledNotifications') || '[]'
    );
    
    notifications.push({
      type,
      reminder,
      scheduledFor: new Date().toISOString(),
    });
    
    localStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
  }

  /**
   * Convert VAPID key to Uint8Array
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(new ArrayBuffer(rawData.length));

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribe(): Promise<boolean> {
    try {
      if (!this.swRegistration) {
        return false;
      }

      const subscription = await this.swRegistration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        console.log('Unsubscribed from push notifications');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      return false;
    }
  }

  /**
   * Check if user is currently subscribed
   */
  async isSubscribed(): Promise<boolean> {
    try {
      if (!this.swRegistration) {
        return false;
      }

      const subscription = await this.swRegistration.pushManager.getSubscription();
      return subscription !== null;
    } catch (error) {
      console.error('Failed to check subscription status:', error);
      return false;
    }
  }
}

export default new PushNotificationService();