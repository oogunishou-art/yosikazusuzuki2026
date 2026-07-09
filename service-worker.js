// Service Worker for Basketball Learning App
const CACHE_NAME = 'basketball-app-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// ===== インストールイベント =====
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll error:', err);
        // オフラインでもインストールを続ける
        return Promise.resolve();
      });
    })
  );
  self.skipWaiting();
});

// ===== アクティベーション =====
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
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
    })
  );
  self.clients.claim();
});

// ===== フェッチイベント（ネットワークファースト戦略） =====
self.addEventListener('fetch', (event) => {
  // GET リクエストのみ処理
  if (event.request.method !== 'GET') {
    return;
  }

  // 外部リソース（API等）は除外
  if (event.request.url.includes('chrome-extension://')) {
    return;
  }

  event.respondWith(
    // ネットワークから取得を試みる
    fetch(event.request)
      .then((response) => {
        // 成功時はキャッシュを更新
        const clonedResponse = response.clone();
        
        // 同じオリジンのGET リクエストのみキャッシュ
        if (event.request.url.startsWith(self.location.origin) && 
            event.request.method === 'GET' &&
            response.status === 200) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }
        
        return response;
      })
      .catch(() => {
        // ネットワーク失敗時はキャッシュから取得
        return caches.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }

          // キャッシュにもない場合はオフラインページを返す
          if (event.request.destination === 'document') {
            return new Response(
              `
              <!DOCTYPE html>
              <html lang="ja">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>オフライン</title>
                <style>
                  body {
                    font-family: 'Noto Sans JP', sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    background: #f8f8f8;
                    color: #333;
                  }
                  .container {
                    text-align: center;
                    max-width: 500px;
                    padding: 2rem;
                  }
                  .icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                  }
                  h1 {
                    color: #FF8C00;
                    margin-bottom: 0.5rem;
                  }
                  p {
                    color: #666;
                    line-height: 1.6;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="icon">📡</div>
                  <h1>インターネット接続がありません</h1>
                  <p>現在オフラインになっています。インターネット接続を確認してから、ページを再度読み込んでください。</p>
                  <p>既にアクセスしたコンテンツはオフラインで表示できます。</p>
                </div>
              </body>
              </html>
              `,
              { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
          }

          return new Response('オフラインです。後でアクセスしてください。');
        });
      })
  );
});

// ===== バックグラウンド同期 =====
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  console.log('Syncing data...');
  // ここでデータ同期の処理を実装
  return Promise.resolve();
}

// ===== プッシュ通知 =====
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'バスケットボール学習プラットフォーム',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23FF8C00" width="192" height="192"/><text x="96" y="140" font-size="100" fill="white" text-anchor="middle" font-weight="bold">🏀</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="40" fill="%23FF8C00"/></svg>',
    tag: 'basketball-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'open',
        title: '開く'
      },
      {
        action: 'close',
        title: '閉じる'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('バスケ学習', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // すでにタブが開いている場合はそこにフォーカス
      for (let client of clientList) {
        if (client.url.includes('./') && 'focus' in client) {
          return client.focus();
        }
      }
      // 新しいタブを開く
      if (clients.openWindow) {
        return clients.openWindow('./');
      }
    })
  );
});

console.log('Service Worker loaded successfully');
