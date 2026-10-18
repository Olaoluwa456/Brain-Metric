/* BrainMetric service worker: same-origin GETs only; versioned allow-list cache. */
const CACHE_NAME = 'brainmetric-pwa-secure-v9-audited';
const APP_FILES = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./question-bank.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./robots.txt",
  "./quizzes/brain-teaser.css",
  "./quizzes/brain-teaser.html",
  "./quizzes/chemistry.css",
  "./quizzes/chemistry.html",
  "./quizzes/culture.css",
  "./quizzes/culture.html",
  "./quizzes/daily-five.css",
  "./quizzes/daily-five.html",
  "./quizzes/exam.css",
  "./quizzes/exam.html",
  "./quizzes/general.css",
  "./quizzes/general.html",
  "./quizzes/geography.css",
  "./quizzes/geography.html",
  "./quizzes/history.css",
  "./quizzes/history.html",
  "./quizzes/index.css",
  "./quizzes/index.html",
  "./quizzes/language.css",
  "./quizzes/language.html",
  "./quizzes/mathematics.css",
  "./quizzes/mathematics.html",
  "./quizzes/nigeria.css",
  "./quizzes/nigeria.html",
  "./quizzes/science.css",
  "./quizzes/science.html",
  "./quizzes/sports.css",
  "./quizzes/sports.html",
  "./quizzes/technology.css",
  "./quizzes/technology.html",
  "./quizzes/ultimate.css",
  "./quizzes/ultimate.html",
  "./quizzes/weekly.css",
  "./quizzes/weekly.html"
];
const SCOPE_URL = new URL(self.registration.scope);
const APP_PATHS = new Set(APP_FILES.map(path => new URL(path, SCOPE_URL).pathname));

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('brainmetric-pwa-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(SCOPE_URL.href)) return;
  if (!APP_PATHS.has(url.pathname)) return;

  // Query parameters define challenge sets, not separate cacheable resources.
  const keyURL = new URL(url.href);
  keyURL.search = '';
  keyURL.hash = '';

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(keyURL.href);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && response.type === 'basic' && !url.search) {
        await cache.put(keyURL.href, response.clone());
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        return (await cache.match(new URL('./index.html', SCOPE_URL).href)) || Response.error();
      }
      return Response.error();
    }
  })());
});
