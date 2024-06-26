const APP_PREFIX = "Vijeth Portfolio"; // Identifier for this app (this needs to be consistent across every cache update)
const VERSION = "version_08"; // Version of the off-line cache (change this value everytime you want to update cache)
const CACHE_NAME = APP_PREFIX + VERSION;
const URLS = [
  // Add URL you want to cache in this list.
  "/", // If you have separate JS/CSS files,
  "/index.html", // add path to those files here
  "/app.js",
  "/sw.js",
];

// Respond with cached resources
self.addEventListener("fetch", (e) => {
  console.log("fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then((request) => {
      if (request) {
        // if cache is available, respond with cache
        console.log(`Responding with cache: ${e.request.url}`);
        return request;
      } 
      // if there are no cache, try fetching request
      console.log(`File is not cached, fetching: ${e.request.url}`);
      return fetch(e.request);

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  );
});

// Cache resources
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`Installing cache: ${CACHE_NAME}`);
      return cache.addAll(URLS);
    })
  );
});

// Delete outdated caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      const cacheWhitelist = keyList.filter((key) => {
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map((key, i) => {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log(`Deleting cache: ${keyList[i]}`);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
