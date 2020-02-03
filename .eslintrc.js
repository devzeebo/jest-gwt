module.exports = {
  root: true,
  extends: [
    'airbnb/base',
    'plugin:lodash/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:jest/recommended'
  ],
  parser: 'babel-eslint',
  env: {
    "jest/globals": true,
  },
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
    'radix': 'off',
    'class-methods-use-this': 'off',
    'spaced-comment': 'off',
    'jest/expect-expect': 'off',
  },
}
