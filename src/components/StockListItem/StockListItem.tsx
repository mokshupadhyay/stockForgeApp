import React, { createElement, FC, memo, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Stock } from '../../types/stock';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from './StockListItem.styles';

interface StockListItemProps {
  stock: Stock;
  onPress: (stock: Stock) => void;
  category: 'gainers' | 'losers' | 'active';
  formatVolume: (volume: string) => string;
}

const StockListItem: FC<StockListItemProps> = memo(
  ({ stock, onPress, category, formatVolume }) => {
    const { theme } = useTheme();
    const isPositive = useMemo(
      () => parseFloat(stock.change_amount) >= 0,
      [stock.change_amount],
    );

    const getCategoryIcon = useCallback(() => {
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
        style={[styles.stockItem, { backgroundColor: theme.card }]}
        onPress={() => onPress(stock)}
        activeOpacity={0.7}
      >
        <View style={styles.stockLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: getIconColor() + '15' },
            ]}
          >
            {createElement(getCategoryIcon(), {
              size: 30,
              color: getIconColor(),
              strokeWidth: 2,
            })}
          </View>
          <View style={styles.stockInfo}>
            <Text style={[styles.ticker, { color: theme.text.primary }]}>
              {stock.ticker}
            </Text>
            <Text style={[styles.volume, { color: theme.text.tertiary }]}>
              Vol: {formattedVolume}
            </Text>
          </View>
        </View>

        <View style={styles.stockRight}>
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
      </TouchableOpacity>
    );
  },
);

export default StockListItem;
