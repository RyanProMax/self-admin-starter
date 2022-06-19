import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

import { SvgLoader } from './src/utils/plugins';
import { PATH } from './src/utils/constant';

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
    Pages({
      // redirect
      extendRoute(route) {
        if (route.path === PATH.HOME)
          return { ...route, redirect: PATH.USER };
      }
    }),

    /**
    * On-demand Import element-plus
    * https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
    */
    AutoImport({
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver()
      ]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver(),
        ElementPlusResolver()
      ]
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
