// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = 'cache'
const notdel = ['cache']

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
  './dist/MarkerCluster.Default.css'
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

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
}); 