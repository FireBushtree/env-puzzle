import path from 'path';
import {defineConfig} from 'dumi';
import IgnoreNotFoundExportPlugin from './webpack-plugins/ignore-not-found-export-plugin';

export default defineConfig({
  // logo: '/images/logo.jpg',
  mode: 'site',
  alias: {
    'env-puzzle': path.resolve(__dirname, './src'),
    '@/src': path.resolve(__dirname, './src'),
  },
  extraBabelPlugins: [
    ['import', {libraryName: 'antd', style: 'css'}, 'antd'],
    [
      'import',
      {
        libraryName: 'env-puzzle',
        libraryDirectory: '',
        customStyleName: (name) => {
          return `env-puzzle/${name}/style/index.tsx`;
        },
      },
      'env-puzzle',
    ],
  ],
  menus: {
    '/guide': [
      {
        title: '介绍',
        children: ['guide/index.md'],
      },
    ],
    '/component': [
      {
        title: 'DASHBOARD',
        children: [
          'table/index.md',
          'scroll/index.md',
          'percent/index.md',
          'b-map/index.md',
        ],
      },
      {
        title: 'CRUD',
        children: [
          'template/index.md',
          'view-modal/index.md',
          'create-modal/index.md',
          'import-modal/index.md',
          'to-map/index.md',
        ],
      },
    ],
  },
  navs: [null],
  chainWebpack(memo, {env, webpack, createCSSRule}) {
    memo
      .plugin('IgnoreNotFoundExportPlugin')
      .before('friendly-error')
      .use(IgnoreNotFoundExportPlugin);
  },
});
