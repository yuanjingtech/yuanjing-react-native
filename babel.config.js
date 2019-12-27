module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      'react-native-paper/babel',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
    ],
    presets: ['babel-preset-expo'],
  };
};
