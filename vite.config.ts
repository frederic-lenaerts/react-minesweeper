import { defineConfig } from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  resolve:{
    alias:{
      '@app' : path.resolve(__dirname, './src/app'),
      '@features': path.resolve(__dirname, './src/features'),
      '@utils' : path.resolve(__dirname, './src/utils'),
    },
  },
})
