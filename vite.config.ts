import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { cloudflare} from '@cloudflare/vite-plugin'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Where `npm run dev` proxies the bot's /appeals routes (login, logout, me and submissions)
  const target = env.APPEALS_API || 'http://127.0.0.1:8080'

  return {
    plugins: [
      vue(),
      vueDevTools(),
      cloudflare({ viteEnvironment: { name: 'worker' } })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/appeals': { target, changeOrigin: true },
      },
    },
  }
})
