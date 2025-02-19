import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from './Text';
import { theme } from '../../theme/theme';

export const Chip = ({ 
  label, 
  selected = false, 
  onPress,
  style 
}) => {
  return (
    <Pressable 
      style={[
        styles.container, 
        selected && styles.selected,
        style
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.label,
        selected && styles.selectedLabel
      ]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  selected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  label: {
    fontSize: 14,
    color: theme.colors.text,
  },
  selectedLabel: {
    color: theme.colors.background,
  },
}); 