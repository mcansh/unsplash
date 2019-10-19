module.exports = api => {
  api.cache(true);

  return {
    presets: ['next/babel'],
    plugins: ['styled-components', 'inline-react-svg', 'root-import'],
  };
};
