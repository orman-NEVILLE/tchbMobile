import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'TCHB Mobile',
        short_name: 'TCHB',
        description: 'Application mobile TCHB',
        theme_color: '#ffffff',
        background_color: '#040c57',
        display: 'standalone',
        start_url: '/',
        scope: '/',

        icons: [
        {
          src: '/icons/tchb-icone.jpg',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/tchb-icone2.jpg',
          sizes: '512x512',
          type: 'image/png',
        },
     ],

      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})