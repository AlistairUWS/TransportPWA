/*global self, console, caches, fetch */
/*eslint no-console: ["error", { allow: ["log", "warn", "error", "dir"] }] */

var CACHE_NAME = "Rail-Timetable=V1.0.0",
    CACHE_URLS = [
        '/',
        '/index.html',
        '/styles/app.min.css',
        '/scripts/app.min.js',
        '/scripts/popups.min.js',
        '/scripts/station_list.min.js',
        '/images/android-icon-36x36.png',
        '/images/android-icon-48x48.png',
        '/images/android-icon-72x72.png',
        '/images/android-icon-96x96.png',
        '/images/android-icon-144x144.png',
        '/images/android-icon-192x192.png',
        '/images/apple-icon-57x57.png',
        '/images/apple-icon-60x60.png',
        '/images/apple-icon-72x72.png',
        '/images/apple-icon-76x76.png',
        '/images/apple-icon-114x114.png',
        '/images/apple-icon-120x120.png',
        '/images/apple-icon-144x144.png',
        '/images/apple-icon-152x152.png',
        '/images/apple-icon-180x180.png',
        '/images/apple-icon-precomposed.png',
        '/images/apple-icon.png',
        '/images/favicon-16x16.png',
        '/images/favicon-32x32.png',
        '/images/favicon-96x96.png',
        '/images/favicon.ico',
        '/images/help.png',
        '/images/ms-icon-70x70.png',
        '/images/ms-icon-144x144.png',
        '/images/ms-icon-150x150.png',
        '/images/ms-icon-310x310.png',
        'https://code.jquery.com/mobile/1.4.5/images/ajax-loader.gif',
        'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css',
        'https://code.jquery.com/jquery-1.11.1.min.js',
        'https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js'
    ];

self.addEventListener('install', function(event) {
    console.log("[ServiceWorker] Installed");
    console.dir(event);
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(CACHE_URLS);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log("[ServiceWorker] Activated");
    console.dir(event);
});

self.addEventListener('fetch', function(event) {
    console.log("[ServiceWorker] Fetching " + event.request.url);
    console.dir(event);
    event.respondWith(
        caches.match(event.request)
        .then(function(response){
            if(response) {
                console.log(response.url + " served from cache.");
                return response;
            }
            console.log(event.request.url + " served from network.");
            return fetch(event.request);
        })
    );
});

/*
self.addEventListener('push', function(event) {
   console.log("[ServiceWorker] Pushed " + event.data);
    console.dir(event);
});
*/
