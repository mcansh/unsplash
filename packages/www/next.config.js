const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  target: 'serverless',
  env: {
    NOW_URL: process.env.NOW_URL,
  },
});
