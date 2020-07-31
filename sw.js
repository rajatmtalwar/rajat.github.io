// importScripts(
//   "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
// );

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }
// console.log("Hello from service-worker.js");
// workbox.precaching.precacheAndRoute([{"revision":"b8265546874adb818cc83c443a7c0479","url":"index.html"},{"revision":"883874a4f474890e1031a0786e2fca36","url":"manifest.webmanifest"}]);

// workbox.routing.registerRoute(
//   /(.*)articles(.*)\.(?:png|gif|jpg)/,
//   workbox.strategies.cacheFirst({
//     cacheName: "images-cache",
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 50,
//         maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//       }),
//     ],
//   })
// );

// const articleHandler = workbox.strategies.networkFirst({
//   cacheName: "articles-cache",
//   plugins: [
//     new workbox.expiration.Plugin({
//       maxEntries: 50,
//     }),
//   ],
// });
// workbox.routing.registerRoute(/(.*)\.html/, (args) => {
//   return articleHandler.handle(args).then((response) => {
//     if (!response) {
//       return caches.match("/offline.html");
//     } else if (response.status === 404) {
//       return caches.match("/404.html");
//     }
//     return response;
//   });
// });
self.addEventListener("install", (event) => {
  console.log("V1 installing…");

  // cache a cat SVG
  event.waitUntil(caches.open("static-v1").then((cache) => cache.add("/home")));
});

self.addEventListener("activate", (event) => {
  console.log("V1 now ready to handle fetches!");
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == "/home") {
    //event.respondWith(caches.match("/home"));
  }
});
