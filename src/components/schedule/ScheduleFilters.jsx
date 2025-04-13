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

// Соответствие между английскими и русскими идентификаторами дней недели
const dayIdMapping = {
  'mon': 'пн',
  'tue': 'вт',
  'wed': 'ср',
  'thu': 'чт',
  'fri': 'пт',
  'sat': 'сб',
  'sun': 'вс'
};

// Обратное соответствие
const reverseIdMapping = {
  'пн': 'mon',
  'вт': 'tue',
  'ср': 'wed',
  'чт': 'thu',
  'пт': 'fri', 
  'сб': 'sat',
  'вс': 'sun'
};

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
  // Находим английский идентификатор для русского дня
  const getEnglishDayId = (russianDayId) => {
    return reverseIdMapping[russianDayId] || russianDayId;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
      >
        {DAYS.map((day) => {
          // Проверяем соответствие с учётом языковых версий
          const isSelected = selectedDay === day.id || selectedDay === dayIdMapping[day.id];
          
          return (
            <Pressable 
              key={day.id} 
              onPress={() => onDayChange(day.id)} 
              style={[
                styles.dayButton, 
                isSelected && styles.selectedDay
              ]}
            >
              <View>
                <Text style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText
                ]}>{day.label}</Text>
                <Text style={[
                  styles.dateText,
                  isSelected && styles.selectedDayText
                ]}>{day.date}</Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.typesContainer}
      >
        {TYPES.map((type) => (
          <Pressable 
            key={type.id} 
            onPress={() => onTypeChange(type.id)} 
            style={[
              styles.typeButton, 
              selectedType === type.id && styles.selectedType
            ]}
          >
            <Text style={[
              styles.typeText,
              selectedType === type.id && styles.selectedTypeText
            ]}>{type.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 8,
  },
  daysContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dayButton: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  selectedDay: {
    backgroundColor: '#4A90E2',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  selectedDayText: {
    color: '#FFF',
  },
  typesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  selectedType: {
    backgroundColor: '#4A90E2',
  },
  typeText: {
    fontSize: 14,
    color: '#000',
  },
  selectedTypeText: {
    color: '#FFF',
  },
}); 