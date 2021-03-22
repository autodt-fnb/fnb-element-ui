module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/typescript',
    '@vue/prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  plugins: ['react'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-sort-props': [
      2,
      {
        shorthandFirst: true,
        callbacksLast: true,
        ignoreCase: true
      }
    ],
    'react/self-closing-comp': [
      2,
      {
        component: true,
        html: true
      }
    ],
    'react/jsx-no-undef': 2,
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
    '@typescript-eslint/ban-types': 0,
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
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
