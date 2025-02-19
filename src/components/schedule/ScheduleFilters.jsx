import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from '../common/Chip';
import { theme } from '../../theme/theme';

const DAYS = [
  { id: 'mon', label: 'ПН' },
  { id: 'tue', label: 'ВТ' },
  { id: 'wed', label: 'СР' },
  { id: 'thu', label: 'ЧТ' },
  { id: 'fri', label: 'ПТ' },
  { id: 'sat', label: 'СБ' },
];

const TYPES = [
  { id: 'all', label: 'Все' },
  { id: 'lecture', label: 'Лекции' },
  { id: 'practice', label: 'Практика' },
  { id: 'lab', label: 'Лабораторные' },
];

export const ScheduleFilters = ({ 
  selectedDay, 
  selectedType,
  onDayChange,
  onTypeChange,
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {DAYS.map((day) => (
        <Chip
          key={day.id}
          label={day.label}
          selected={selectedDay === day.id}
          onPress={() => onDayChange(day.id)}
        />
      ))}
      {TYPES.map((type) => (
        <Chip
          key={type.id}
          label={type.label}
          selected={selectedType === type.id}
          onPress={() => onTypeChange(type.id)}
          style={styles.typeChip}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    marginBottom: theme.spacing.md,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
  },
  typeChip: {
    marginLeft: theme.spacing.sm,
  },
}); 