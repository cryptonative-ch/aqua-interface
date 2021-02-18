module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/jsx-filename-extension': 0,
    "no-use-before-define": 'off',
    "@typescript-eslint/no-use-before-define": ['error'],
    'react/prop-types': 0,
    'linebreak-style': 0,
  },
}
