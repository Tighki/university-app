import React from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { Text } from '../common/Text';
import { theme } from '../../theme/theme';

const DAYS = [
  { id: 'mon', label: 'ПН', fullName: 'Понедельник', date: '25' },
  { id: 'tue', label: 'ВТ', fullName: 'Вторник', date: '26' },
  { id: 'wed', label: 'СР', fullName: 'Среда', date: '27' },
  { id: 'thu', label: 'ЧТ', fullName: 'Четверг', date: '28' },
  { id: 'fri', label: 'ПТ', fullName: 'Пятница', date: '29' },
  { id: 'sat', label: 'СБ', fullName: 'Суббота', date: '30' },
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
    <View style={styles.filtersContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
        contentContainerStyle={styles.daysContent}
      >
        {DAYS.map((day) => (
          <Pressable
            key={day.id}
            style={[
              styles.dayButton,
              selectedDay === day.id && styles.selectedDayButton
            ]}
            onPress={() => onDayChange(day.id)}
          >
            <Text style={[
              styles.dayLabel,
              selectedDay === day.id && styles.selectedText
            ]}>
              {day.label}
            </Text>
            <Text style={[
              styles.dateLabel,
              selectedDay === day.id && styles.selectedText
            ]}>
              {day.date}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.typesContainer}
        contentContainerStyle={styles.typesContent}
      >
        {TYPES.map((type) => (
          <Pressable
            key={type.id}
            style={[
              styles.typeButton,
              selectedType === type.id && styles.selectedTypeButton
            ]}
            onPress={() => onTypeChange(type.id)}
          >
            <Text style={[
              styles.typeLabel,
              selectedType === type.id && styles.selectedTypeText
            ]}>
              {type.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    marginTop: 16,
  },
  daysContainer: {
    flexGrow: 0,
    marginBottom: 12,
  },
  daysContent: {
    paddingHorizontal: theme.spacing.md,
  },
  dayButton: {
    width: 54,
    height: 70,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedDayButton: {
    backgroundColor: theme.colors.primary,
  },
  dayLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  typesContainer: {
    flexGrow: 0,
  },
  typesContent: {
    paddingHorizontal: theme.spacing.md,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedTypeButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  typeLabel: {
    fontSize: 14,
    color: theme.colors.text,
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
}); 