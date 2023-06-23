module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    ['@babel/preset-typescript', { allowDeclareFields: true }],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@images': './assets/images',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    'babel-plugin-styled-components',
    'react-native-reanimated/plugin',
  ],
};
