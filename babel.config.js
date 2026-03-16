module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // NOTE: Do NOT add 'react-native-reanimated/plugin' here.
    // This project uses react-native-reanimated v4 which does NOT use a Babel plugin.
    // Adding that plugin causes Hermes "non-terminated string" compile errors.
  };
};
