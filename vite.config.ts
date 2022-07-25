import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import PostcssPxToViewport from 'postcss-px-to-viewport';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        VantResolver(),
      ],
    }),
  ],
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
