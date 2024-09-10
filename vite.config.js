import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow connections from external hosts
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5173, // Use the port specified in environment variables, default to 5173
  }
})
