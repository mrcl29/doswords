import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  server: {
    host: '0.0.0.0',  // escucha en todas las interfaces
    port: 5173,
    strictPort: true,  // falla si el puerto está ocupado
    hmr: {
      host: 'localhost', // dirección que usa el navegador para conectarse al WS
      protocol: 'ws',    // websocket
    },
  },
})
