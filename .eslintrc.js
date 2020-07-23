module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:lodash/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: 'babel-eslint',
  overrides: [{
    files: ['**/*.spec.js'],
    env: {
      jest: true,
    },
    rules: {
      camelcase: 'off',
      'prefer-arrow-callback': 'off',
      'func-names': 'off',
      'no-use-before-define': 'off',
      'no-param-reassign': 'off',
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
  },
};
