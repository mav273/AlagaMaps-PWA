// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = 'cache'

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = [
  '/index.html',
  '/telaCadastro.html',
  '/telaContatosUteis.html',
  '/telaPrincipal.html',

  './Css/contatosUteis.css',
  './Css/main.css',
  './Css/mapa.css',
  './Css/telaLogin-Cadastro.css',

  './Javascript/pontos.js',
  './Javascript/responsividade.js',

  './dist/leaflet.markercluster-src.js',
  './dist/leaflet.markercluster-src.js.map',
  './dist/leaflet.markercluster.js',
  './dist/leaflet.markercluster.js.map',
  './dist/MarkerCluster.css',
  './dist/MarkerCluster.Default.css',

  './manifest.json'
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.matchAll(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});