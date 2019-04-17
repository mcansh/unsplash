const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  target: 'serverless',
  env: {
    ENDPOINT:
      process.env.NODE_ENV === 'production'
        ? 'https://unsplash-api.loganmcansh.com'
        : 'http://localhost:4000',
    // ENDPOINT: 'https://unsplash-api.loganmcansh.com',
  },
});
