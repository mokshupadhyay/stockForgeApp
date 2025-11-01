import React, { FC, memo, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Stock } from '../../types/stock';
import { Theme } from '../../constants/theme';
import { styles } from './StockCard.styles';

interface StockCardProps {
  stock: Stock;
  onPress: (stock: Stock) => void;
  theme: Theme;
  category: 'gainers' | 'losers' | 'active';
}

export const StockCard: FC<StockCardProps> = memo(
  ({ stock, onPress, theme, category }) => {
    const isPositive = useMemo(
      () => parseFloat(stock.change_amount) >= 0,
      [stock.change_amount],
    );

    const getIconComponent = useCallback(() => {
      switch (category) {
        case 'gainers':
          return TrendingUp;
        case 'losers':
          return TrendingDown;
        case 'active':
          return isPositive ? TrendingUp : TrendingDown;
        default:
          return TrendingUp;
      }
    }, [category, isPositive]);

    const getIconColor = useCallback(() => {
      switch (category) {
        case 'gainers':
          return theme.success;
        case 'losers':
          return theme.error;
        case 'active':
          return isPositive ? theme.success : theme.error;
        default:
          return theme.success;
      }
    }, [category, isPositive, theme.success, theme.error]);

    const formatVolume = useCallback((volume: string) => {
      const num = parseFloat(volume);
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
      }
      return volume;
    }, []);

    const containerStyle = useMemo(
      () => [
        styles.container,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
        },
      ],
      [theme.card, theme.shadow],
    );

    const iconContainerStyle = useMemo(
      () => [styles.iconContainer, { backgroundColor: getIconColor() + '20' }],
      [getIconColor],
    );

    const priceValue = useMemo(
      () => parseFloat(stock.price).toFixed(2),
      [stock.price],
    );
    const formattedVolume = useMemo(
      () => formatVolume(stock.volume),
      [stock.volume, formatVolume],
    );

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={() => onPress(stock)}
        activeOpacity={0.8}
      >
        <View style={styles.header}>
          <Text style={[styles.ticker, { color: theme.text.primary }]}>
            {stock.ticker}
          </Text>
          <View style={iconContainerStyle}>
            {React.createElement(getIconComponent(), {
              size: 32,
              color: getIconColor(),
              strokeWidth: 2,
            })}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.price, { color: theme.text.primary }]}>
            ${priceValue}
          </Text>
          <Text
            style={[
              styles.change,
              { color: isPositive ? theme.success : theme.error },
            ]}
          >
            {isPositive ? '+' : ''}
            {stock.change_percentage}
          </Text>
        </View>

        <View style={[styles.footer, { borderTopColor: theme.border + '30' }]}>
          <Text style={[styles.volume, { color: theme.text.tertiary }]}>
            Vol: {formattedVolume}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
);
