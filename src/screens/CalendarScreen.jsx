import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';

export const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Календарь</Text>
      </View>
      <View style={styles.content}>
        <Text>Здесь будет календарь событий</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.secondary,
    ...theme.shadows.small,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
});
