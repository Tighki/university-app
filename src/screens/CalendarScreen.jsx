import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';

const events = [
  { id: '1', title: 'Вебинар по программированию', date: '25 октября', time: '18:00' },
  { id: '2', title: 'Семинар по математике', date: '26 октября', time: '14:00' },
  { id: '3', title: 'Конференция по ИТ', date: '28 октября', time: '10:00' },
];

export const CalendarScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Мероприятия</Text>
        <ScrollView>
          {events.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDetails}>{event.date} в {event.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  eventCard: {
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: theme.spacing.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
  },
});
