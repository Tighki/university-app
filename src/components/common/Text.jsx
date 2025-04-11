import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const Text = ({ style, variant = 'body', children, ...props }) => {
  return (
    <RNText 
      style={[styles[variant], style]} 
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: theme.typography.h1,
  h2: theme.typography.h2,
  h3: theme.typography.h3,
  body: theme.typography.body,
  caption: theme.typography.caption,
}); 