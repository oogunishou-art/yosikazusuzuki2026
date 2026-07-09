// Service Worker for Basketball Learning Platform
const CACHE_NAME = 'basketball-learning-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './book_structure.json',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

// ===== インストールイベント =====
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching app shell');
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Cache addAll error:', err);
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

// ===== フェッチイベント =====
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  if (event.request.url.includes('chrome-extension://')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clonedResponse = response.clone();
        
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
        return caches.match(event.request).then((cached) => {
          if (cached) {
            return cached;
          }

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

console.log('Service Worker loaded successfully');
