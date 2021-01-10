export default {
  esm: {
    type: 'babel',
    importLibToEs: true,
  },
  cjs: 'babel',
  extraBabelPlugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/src': './src',
        },
      },
    ],
  ],
};
