import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api/nim': {
          target: 'https://integrate.api.nvidia.com/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/nim/, ''),
          headers: {
            'Connection': 'keep-alive'
          }
        }
      }
    },
    define: {
      'process.env.NIM_API1': JSON.stringify(env.nim_api1),
      'process.env.NIM1': JSON.stringify(env.nim1),
      'process.env.NIM2': JSON.stringify(env.nim2),
      'process.env.NIM3': JSON.stringify(env.nim3),
      'process.env.NIM4': JSON.stringify(env.nim4),
      'process.env.NIM5': JSON.stringify(env.nim5),
    }
  }
})
