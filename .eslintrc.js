module.exports = {
  extends: [
    '@react-ddd/eslint-config/typescript',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  overrides: [{
    files: ['./examples/**'],
    rules: {
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
  }],
};
