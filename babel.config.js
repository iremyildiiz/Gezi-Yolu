module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // react-native-reanimated plugin'i en başta olmalı
    'react-native-reanimated/plugin',
    
    [
      '@babel/plugin-transform-private-methods',
      { loose: true }, // `loose` modunu açıkça belirtin
    ],
    
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
