/// <reference types="vitest" />

import path from 'path'

import { defineConfig } from 'vite'
import type { ConfigEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import autoprefixer from 'autoprefixer'
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const isBuild = mode !== 'development'

  return defineConfig({
    plugins: [
      Vue({
        // vue3最新的语法 ，例如 直接 $ref() $reactive()
        // https://vuejs.org/guide/extras/reactivity-transform.html#reactivity-transform
        reactivityTransform: true,
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        // 预先导入的一些方法（之后可以写vuex、pinia）
        imports: [
          'vue',
          'vue/macros',
          '@vueuse/core',
          'vue-router',
          'pinia',
        ],
        dts: true,
        // 这里的含义就是指定目录下的导出的模块会注入auto.imports.d.ts文件中，之后可以在需要导入他们的地方直接使用导出名称就好了文件中直接使用
        // 但是made这里有一个bug，在composables目录中编写的导出不会自动注入auto-imports.d.ts中，所以目前先注释
        dirs: [
          // './src/composables',
        ],
        vueTemplate: true,
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: true,
        // 自动导入哪些目录下的组件（src/components目录以及src/libs目录）
        dirs: ['src/components'],
        // 后缀vue组件
        extensions: ['vue'],
        // 以下两项 支持 Demo/index.vue 的形式声明组件的导入（最终组件名称是Demo）
        directoryAsNamespace: true,
        collapseSamePrefixes: true,
        resolvers: [VantResolver()],
      }),

      // https://github.com/vbenjs/vite-plugin-mock/blob/HEAD/README.zh_CN.md
      viteMockServe({
        // 忽略目录下的以 _ 开头的文件
        ignore: /^\_/,
        // 配置mock位置
        mockPath: '/mock',
        // 开发开启
        localEnabled: !isBuild,
        // 生产开启
        prodEnabled: isBuild,
        // 注意这里的路径是相对于main.ts
        injectCode: `
         import { setupProdMockServer } from '../mock/_createProdServer';
         setupProdMockServer();
         `,
      }),

      // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
    ],

    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/styles/index.scss" as *;',
        },
      },
      postcss: {
        plugins: [
          autoprefixer(),
          postcsspxtoviewport({
            viewportWidth: 375,
          }),
        ],
      },
    },

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  })
}
