import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: [
    '@vite-pwa/nuxt'
  ],
  pwa: {
    registerType: 'autoUpdate',

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    
    manifest: {
      name: 'Invoixa',
      short_name: 'Invoixa',
      description: 'Invoice management app',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
    },
    
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },
    
    client: {
      installPrompt: true,
    },
    
    devOptions: {
      enabled: true,
      suppressWarnings: true,  // Added to suppress dev warnings
      type: 'module',
    },
  }
})