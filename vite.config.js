import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: [vue2()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@imgs': path.resolve(__dirname, 'src/assets/images'),
        '@comps': path.resolve(__dirname, 'src/components')
      },
      extensions: ['.js', '.json', '.vue', '.jsx', '.cjs', '.mjs'] // 文件后缀拓展
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use '${path.resolve(__dirname, 'src/styles/mixin.scss')}' as *;
          @use "${path.resolve(__dirname, 'src/styles/variables.scss')}" as *;
          `
        }
      }
    },

    // 打包
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 1600, // 触发警告的 chunk 大小
      rollupOptions: {
        external: [], // 指定外部依赖模块

        output: {
          chunkFileNames: 'static/js1/[name]-[hash].js', // 设置输出的 chunk 文件名
          entryFileNames: 'static/js2/[name]-[hash].js', // 设置输出的入口文件名
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]', // 设置输出的资源文件名
          // 分包 减小main.js体积
          manualChunks: filePath => {
            if (filePath.includes('node_modules')) {
              const arr = filePath.toString().split('node_modules/')[1].split('/')
              const pack = ['vue', 'vue-router']
              if (pack.includes(arr[0])) {
                return `_${arr[0]}` // 将指定的包分割为单独的 chunk
              }
              return '__vendor' // 其他第三方包统一打包到一个 chunk
            }
            return '__vendor' // 非第三方包统一打包到一个 chunk
          }
        }
      }
    },

    esbuild: {
      drop: ['debugger']
    },

    // 本地服务
    server: {
      port: env.VITE_PORT,
      hmr: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_SERVER_API, // 使用环境变量
          changeOrigin: true,
          rewrite: paths => paths.replace(/^\/api/, '')
        }
      }
    }
  })
}
