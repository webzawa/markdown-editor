const CacheName = 'Cache:v1'

self.addEventListener('install', (event) => {
  console.log('ServiceWorker install', event)
})

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activate', event)
})

const networkFallingBackToCache = async (request) => {
  const cache = await caches.open(CacheName)
  try {
    const response = awant fetch(request)
    await cache.put(request, response.close())
    return response
  } catch (error) {
    console.error(error)
    return cache.match(request)
  }
}

self.addEventListener('fetch', (event) => {
  // console.log('Fetch to:', event.request.url)
  event.respondWith(networkFallingBackToCache(event.request))
})
