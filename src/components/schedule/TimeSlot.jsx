import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../common/Text';
import { theme } from '../../theme/theme';

export const TimeSlot = ({ startTime, endTime, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.time}>{startTime}</Text>
      <View style={styles.divider} />
      <Text style={styles.time}>{endTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 60,
  },
  time: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: 1,
    width: 16,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.xs,
  },
}); 