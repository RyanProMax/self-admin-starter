import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import { SvgLoader } from './src/utils/plugins';

// const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}`
    }
  },
  plugins: [
    /**
     * 启用响应性语法糖
     * https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html
     */
    Vue({ reactivityTransform: true }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    /**
    * On-demand Import element-plus
    * https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
    */
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    ElementPlus(),

    SvgLoader()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@use "~/styles/variable.scss" as *;'
      }
    }
  }
});
