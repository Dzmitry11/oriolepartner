import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  preset: 'vercel',
  srcDir: join(__dirname, 'dist/server'),
  serverDir: join(__dirname, 'dist/server'),
  publicAssets: [
    {
      dir: join(__dirname, 'public'),
      baseURL: '/',
    },
  ],
  rollupConfig: {
    input: join(__dirname, 'dist/server/server.js'),
    external: [],
  },
}
