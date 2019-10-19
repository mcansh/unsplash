module.exports = {
  extends: ['@mcansh/eslint-config/typescript'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['prettier.comfig.js', 'stylelint.config.js'],
      },
    ],
  },
};
