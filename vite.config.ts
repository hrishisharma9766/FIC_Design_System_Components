import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ 
      exclude: ['src/App.tsx', 'src/main.tsx'],
      entryRoot: 'src',
      outDir: 'dist',
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
      insertTypesEntry: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignCheckUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css';
          }
          return assetInfo.name || '[name].[ext]';
        },
      },
    },
  },
})
