module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 0,
    'no-unused-vars': 0,
    'no-irregular-whitespace': 0,
    'no-empty': 0,
    'no-empty-function': 0,
    'no-multiple-empty-lines': 0,
    'no-irregular-whitespace': 0,
    'prefer-const': 0,
    'vue/no-unused-components': 0,
    'vue/require-v-for-key': 0,
    'vue/no-empty-method': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
  },
}