var staticCacheName = "w-static-v2";

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(staticCacheName).then(function(cache){
            return cache.addAll(
                [
                    '/',
                    '/css/restaurant.css',
                    '/css/styles.css',               
                    '/js/main.js',
                    '/index.html',
                    '/restaurant.html',
                    '/img/404.jpeg',
                    '/data/restaurants.json'
                ]
            );
        })
    )
})

// self.addEventListener("fetch", function(event){
//     event.respondWith(
//         fetch(event.request).then(function(response){
//             if(response.status == 404) {
//                 return fetch("./img/404.jpeg");
//             }
//             return response;
//         }).catch(function() {
//             return new Response("Please check your internet connection");
//         })
//     );
// })

self.addEventListener("fetch", function(event){
    event.respondWith(
            caches.match(event.request).then(function(response){
                if(response) return response;
                return fetch(event.request);
            })
        )
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
            cacheNames.filter(function(cacheName){
                return cacheName.startsWith("static-") && cacheName != staticCacheName;
            }).map(function(cacheName){
                return cache.delete(cacheName);
            })
        );
        })
    )
})