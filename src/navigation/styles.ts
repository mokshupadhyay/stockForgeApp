import { spacing } from '../constants/theme';

export const getTabBarStyle = (theme: any, bottomPadding: number) => ({
  backgroundColor: theme.background,
  borderTopColor: theme.border,
  borderTopWidth: 1,
  paddingTop: 15,
  paddingBottom: bottomPadding,
  paddingHorizontal: spacing.lg,
  height: 65 + bottomPadding,
  shadowColor: theme.shadow,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 12,
});

export const tabBarLabelStyle = {
  fontSize: 12,
  fontWeight: '600' as const,
  marginTop: spacing.xs,
  marginBottom: spacing.xs,
};

export const tabBarItemStyle = {
  paddingVertical: -spacing.lg,
};

export const getIconStyle = (theme: any, focused: boolean) => ({
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  width: 36,
  height: 36,
  borderRadius: 12,
  backgroundColor: focused ? `${theme.accent}15` : 'transparent',
});
