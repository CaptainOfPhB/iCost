import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import PostcssPxToViewport from 'postcss-px-to-viewport';

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        PostcssPxToViewport({
          viewportWidth: 375,
        }),
      ],
    },
  },
});
