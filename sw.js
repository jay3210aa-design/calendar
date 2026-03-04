self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE_NOTIFICATION') {
    const { id, title, body, delay } = e.data;
    setTimeout(() => {
      self.registration.showNotification(title, {
        body: body,
        icon: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f4c5.png',
        badge: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/72x72/1f4c5.png',
        tag: id,
        requireInteraction: true,
        vibrate: [200, 100, 200]
      });
    }, delay);
  }
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(cs => {
    if (cs.length > 0) cs[0].focus();
    else clients.openWindow('/calendar/');
  }));
});
