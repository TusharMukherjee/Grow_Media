// every time changing the file change version
const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

const asset = ['index.html','offline.html'];


// Install service worker
self.addEventListener('install', evt =>{
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell asset');
            cache.addAll(asset);
        })
    )
    console.log("service worker installed");
});

// activate service worker
// delete old cache on activate new service worker
self.addEventListener('activate', evt =>{
    evt.waitUntil(
        caches.keys().then(
            keys => {
                return Promise.all(keys
                    .filter(key => key !== staticCacheName)
                    .map(key => caches.delete(key))    
                )
            }
        )
    )
    console.log("service worker has been activated");
});

// fetch event
self.addEventListener('fetch', evt => {
    console.log("fetch event", evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                        return caches.open(dynamicCacheName).then(cache => {
                            cache.put(evt.request.url,fetchRes.clone());
                            return fetchRes;
                        })
                    }
                )
            }
        )
    )
});