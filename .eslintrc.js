module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  overrides: [{
    files: ['**/*.spec.ts'],
    env: {
      jest: true,
    },
    rules: {
      'react/no-this-in-sfc': 'off',
      camelcase: 'off',
      '@typescript-eslint/naming-convention': 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-param-reassign': 'off',
    },
  }, {
    files: ['examples/**/*.ts'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  }],
  rules: {
    'linebreak-style': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-return-assign': ['error', 'except-parens'],
    radix: 'off',
    'class-methods-use-this': 'off',
    'spaced-comment': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
      enums: 'always-multiline',
      generics: 'ignore',
      tuples: 'always-multiline',
    }],
  },
};
