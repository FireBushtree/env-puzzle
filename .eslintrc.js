const scriptExtensions = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  globals: {
    describe: true,
    test: true,
    expect: true,
  },
  rules: {
    'linebreak-style': [0],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: scriptExtensions,
      },
      typescript: {
        project: 'tsconfig.json',
      },
    },
  },
};
