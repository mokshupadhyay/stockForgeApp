// src/navigation/AppNavigator.tsx
import React, { lazy, LazyExoticComponent, memo, Suspense } from 'react';
import { Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Search, Bookmark } from 'lucide-react-native';
import { useTheme } from '../contexts/ThemeContext';
import AppLoader from '../components/AppLoader/index';
import {
  getTabBarStyle,
  tabBarLabelStyle,
  tabBarItemStyle,
  getIconStyle,
} from './styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Lazy load screens
const ExploreScreen = lazy(
  () => import('../screens/ExploreScreen/ExploreScreen'),
);
const WatchlistScreen = lazy(
  () => import('../screens/WatchlistScreen/WatchlistScreen'),
);
const ViewAllScreen = lazy(
  () => import('../screens/ViewAllScreen/ViewAllScreen'),
);
const StockDetailScreen = lazy(
  () => import('../screens/StockDetailScreen/StockDetailScreen'),
);

// Higher-order component to wrap lazy components with Suspense
const withSuspense = (Component: LazyExoticComponent<any>) => {
  return (props: any) => (
    <Suspense fallback={<AppLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

// Wrapped components
const ExploreScreenWithSuspense = withSuspense(ExploreScreen);
const WatchlistScreenWithSuspense = withSuspense(WatchlistScreen);
const ViewAllScreenWithSuspense = withSuspense(ViewAllScreen);
const StockDetailScreenWithSuspense = withSuspense(StockDetailScreen);

// Explore Stack
function ExploreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: { opacity: current.progress },
        }),
      }}
    >
      <Stack.Screen name="ExploreMain" component={ExploreScreenWithSuspense} />
      <Stack.Screen name="ViewAll" component={ViewAllScreenWithSuspense} />
      <Stack.Screen
        name="StockDetail"
        component={StockDetailScreenWithSuspense}
      />
    </Stack.Navigator>
  );
}

// Watchlist Stack
function WatchlistStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: { opacity: current.progress },
        }),
      }}
    >
      <Stack.Screen
        name="WatchlistMain"
        component={WatchlistScreenWithSuspense}
      />
      <Stack.Screen
        name="StockDetail"
        component={StockDetailScreenWithSuspense}
      />
    </Stack.Navigator>
  );
}

// Tab Icon Component
const TabIcon = memo(
  ({
    icon,
    color,
    focused,
  }: {
    icon: string;
    color: string;
    focused: boolean;
  }) => {
    const { theme } = useTheme();
    const IconComponent = icon === 'explore' ? Search : Bookmark;
    const iconStyle = getIconStyle(theme, focused);

    return (
      <View style={iconStyle}>
        <IconComponent
          size={24}
          color={color}
          fill={icon === 'watchlist' && focused ? color : 'none'}
          strokeWidth={2.5}
        />
      </View>
    );
  },
);

// Tab Navigator
function TabNavigator() {
  const { theme } = useTheme();
  const bottomPadding = Platform.OS === 'ios' ? 20 : 15;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: getTabBarStyle(theme, bottomPadding),
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.text.tertiary,
        tabBarLabelStyle,
        tabBarItemStyle,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="explore" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStack}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="watchlist" color={color} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default AppNavigator;
