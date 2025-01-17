import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/TMi/' : '/',
  build: {
    outDir: 'docs',
    sourcemap: true
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(),
        IconsResolver()
      ],
      eslintrc:{enabled: true}
    }),
    Components({
      resolvers: [ElementPlusResolver(),
        IconsResolver({
          enabledCollections:["ep"],
        })
      ],
    }),
    Icons({
      autoInstall:true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
