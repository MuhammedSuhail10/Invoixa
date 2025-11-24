<template>
  <div class="font-[poppins] h-[100dvh] relative">
    <NuxtPage />
    <PwaInstallPrompt />
  </div>
</template>

<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Invoixa' },
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/icon-192x192.png' },
    { rel: 'manifest', href: '/manifest.webmanifest' },  // Add this line
  ],
})
</script>