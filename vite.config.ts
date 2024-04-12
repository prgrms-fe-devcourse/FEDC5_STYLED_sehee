import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@/Api', replacement: path.resolve(__dirname, 'Api') },
      { find: '@/Assets', replacement: path.resolve(__dirname, 'Assets') },
      {
        find: '@/Components',
        replacement: path.resolve(__dirname, 'Components'),
      },
      {
        find: '@/Constants',
        replacement: path.resolve(__dirname, 'Constants'),
      },
      { find: '@/Contexts', replacement: path.resolve(__dirname, 'Contexts') },
      { find: '@/Hooks', replacement: path.resolve(__dirname, 'Hooks') },
      { find: '@/Pages', replacement: path.resolve(__dirname, 'Pages') },
      { find: '@/Routes', replacement: path.resolve(__dirname, 'Routes') },
      { find: '@/Services', replacement: path.resolve(__dirname, 'Services') },
      { find: '@/Stores', replacement: path.resolve(__dirname, 'Stores') },
      { find: '@/Styles', replacement: path.resolve(__dirname, 'Styles') },
      { find: '@/Types', replacement: path.resolve(__dirname, 'Types') },
      { find: '@/Utils', replacement: path.resolve(__dirname, 'Utils') },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const module = id.split('node_modules/').pop().split('/')[0];

            return `vendor/${module}`;
          }
        },
      },
    },
  },
});
