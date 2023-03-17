
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', { scope: './' })
        .then(function (registration) {
            document.querySelector('#status').textContent = 'succeeded';
        }).catch(function (error) {
            document.querySelector('#status').textContent = error;
        });
} else {
    // The current browser doesn't support service workers.
    let aElement = document.createElement('a');
    aElement.href = 'http://www.chromium.org/blink/serviceworker/service-worker-faq';
    aElement.textContent = 'unavailable';
    document.querySelector('#status').appendChild(aElement);
}

self.addEventListener('install', (event) => {
    console.log('install事件')
    self.skipWaiting() //用来强制更新的servicework跳过等待时间
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        })
    )
})
