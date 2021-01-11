import path from 'path';
import {defineConfig} from 'dumi';

export default defineConfig({
  // logo: '/images/logo.jpg',
  mode: 'site',
  alias: {
    envd: path.resolve(__dirname, './src'),
  },
  extraBabelPlugins: [
    ['import', {libraryName: 'antd', style: 'css'}, 'antd'],
    [
      'import',
      {
        libraryName: 'envd',
        libraryDirectory: '',
        customStyleName: (name) => {
          return `envd/${name}/style/index.less`;
        },
      },
      'envd',
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
        title: '组件',
        children: ['table/index.md', 'scroll/index.md', 'percent/index.md'],
      },
    ],
  },
  navs: [null],
});
