import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'
import SvgLoader from 'vite-svg-loader'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      include: [
        'src/**/widgets/*.vue',
        'src/**/views/*.vue',
        'src/**/hooks/*.ts',
        'src/**/services/*.ts',
        'src/**/filters/*.ts',
        'src/**/guards/*.ts',
        'src/**/utils/*.ts',
      ],
      reportsDirectory: 'coverage',
    },
  },

  plugins: [
    Vue(),
    VitePWA({ registerType: 'autoUpdate' }),
    SvgLoader(),
  ],
})
