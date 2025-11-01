import React, { FC, JSX, useCallback } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { useNetworkConnectivity } from './src/hooks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoader from './src/components/AppLoader';
import AppNavigator from './src/navigation/AppNavigator';
import NoInternetScreen from './src/screens/NoInternetScreen/NoInternetScreen'; // ✅ Direct import

const AppContent: FC = () => {
  const { theme, isDark } = useTheme();
  const { isConnected, isLoading, checkConnectivity } =
    useNetworkConnectivity();

  const handleRetry = useCallback(async () => {
    await checkConnectivity();
  }, [checkConnectivity]);

  const statusBarStyle = isDark ? 'light-content' : 'dark-content';

  // ✅ Show loader while checking connectivity
  if (isLoading) {
    return <AppLoader />;
  }

  // ✅ Show no internet screen - blocks entire app (correct behavior)
  if (isConnected === false) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={theme.background}
        />
        <NoInternetScreen onRetry={handleRetry} />
      </View>
    );
  }

  // ✅ Show main app only when connected
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={theme.background} />
      <AppNavigator />
    </View>
  );
};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
