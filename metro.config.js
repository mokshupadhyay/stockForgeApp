/**
 * Metro configuration for React Native
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * ✅ Updated Metro config for faster startup & smaller JS bundle
 * - Enables inlineRequires (lazy-initializes modules)
 * - Keeps sourceExts and assetExts from default config
 * - Supports Hermes (if enabled)
 */

const config = {
  transformer: {
    // Defer loading of modules until they're needed
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true, // ⚡ key optimization
      },
    }),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts,
    sourceExts: defaultConfig.resolver.sourceExts,
  },
  // Optional advanced optimization: RAM bundle mode (optional)
  // serializer: {
  //   getModulesRunBeforeMainModule: () => [
  //     require.resolve('./index.js'),
  //   ],
  //   processModuleFilter: (module) => true,
  // },
};

module.exports = mergeConfig(defaultConfig, config);
