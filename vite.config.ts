import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'
import fs from 'fs'
// 构建md目录
function setDir (root, data) {
  const dirArr = fs.readdirSync(root)
  dirArr.forEach(name => {
    const path = `${root}/${name}`
    const isDir = fs.statSync(path).isDirectory()
    const current = { name, path: path.replace('./public', ''), isDir, children: [] }
    data.push(current)
    if (isDir) setDir(path, current.children)
  })
}
const data = []
setDir('./public/md', data)
fs.writeFileSync('./src/assets/dir.json', JSON.stringify(data))
// https://vitejs.dev/config/
export default defineConfig({
  base: '/wzx0905/',
  build: {
    outDir: 'wzx0905'
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false // 禁用 eslint 缓存
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/variables.scss";'
      }
    }
  }
})
