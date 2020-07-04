module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'vue/name-property-casing': [2, 'PascalCase'],
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'always'
        }
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [2],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/array-type': 2,
    '@typescript-eslint/explicit-member-accessibility': 0,
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  parserOptions: {
    useJSXTextNode: true,
    ecmaVersion: 6,
    sourceType: 'module',
    // project: './tsconfig.json',
    // tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true
    }
  }
}
