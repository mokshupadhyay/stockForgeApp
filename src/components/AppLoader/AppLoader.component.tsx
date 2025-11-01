// src/components/AppLoader/AppLoader.tsx
import React, { FC, memo } from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface AppLoaderProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
}

const AppLoader: FC<AppLoaderProps> = memo(
  ({ size = 'large', color, fullScreen = true, style, backgroundColor }) => {
    const { theme } = useTheme();

    const loaderColor = color || theme.accent;
    const bgColor = backgroundColor || theme.background;

    return (
      <View
        style={[
          fullScreen ? styles.fullScreen : styles.inline,
          { backgroundColor: bgColor },
          style,
        ]}
      >
        <ActivityIndicator size={size} color={loaderColor} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inline: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

AppLoader.displayName = 'AppLoader';

export default AppLoader;
