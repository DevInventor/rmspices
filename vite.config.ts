import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Read base path from environment variable (from .env file or process.env)
  // Priority: process.env.VITE_BASE_PATH > env.VITE_BASE_PATH > default '/'
  const basePath = process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || '/';

  return {
    plugins: [react()],
    base: basePath, // Base path from environment variable (VITE_BASE_PATH)
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild', // Use esbuild (default) instead of terser
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['lucide-react'],
          },
        },
      },
    },
    server: {
      port: 5173,
      open: true,
    },
    preview: {
      port: 4173,
      open: true,
    },
  };
});
