module.exports = {
    env: {
      node: true,
      commonjs: true,
      es2021: true,
      jest: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      'no-console': 'off', 
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 
      'indent': ['error', 2], 
      'quotes': ['error', 'single'], 
      'semi': ['error', 'always'], 
    },
  };
  