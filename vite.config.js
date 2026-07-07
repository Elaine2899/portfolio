import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './', // Sets asset paths as relative so the site can load properly on subfolders like GitHub Pages
  build: {
    rollupOptions: {
      // Multi-page build: standalone case-study pages alongside the main page
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        functrl: fileURLToPath(new URL('./functrl.html', import.meta.url)),
        prepagent: fileURLToPath(new URL('./prepagent.html', import.meta.url)),
      },
    },
  },
});
