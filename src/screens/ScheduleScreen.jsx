import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { schedule } from '../data/schedule'; // Убедитесь, что файл существует
import { ScheduleFilters } from '../components/schedule/ScheduleFilters';

export const ScheduleScreen = ({ navigation }) => {
  // Убираем заголовок
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [selectedDay, setSelectedDay] = useState('mon');
  const [selectedType, setSelectedType] = useState('all'); // Состояние для типа занятия
  const [lessons, setLessons] = useState(schedule[selectedDay] || []);

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setLessons(schedule[day] || []);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Filter lessons by type
  const filteredLessons = lessons.filter((lesson) => {
    return selectedType === 'all' || lesson.type === selectedType;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScheduleFilters 
        selectedDay={selectedDay} 
        onDayChange={handleDayChange} 
        selectedType={selectedType} // Передаем выбранный тип
        onTypeChange={handleTypeChange} // Передаем обработчик изменения типа
      />
      <ScrollView style={styles.content}>
        {filteredLessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonCard}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{lesson.startTime}</Text>
              <Text style={styles.time}>{lesson.endTime}</Text>
            </View>
            <View style={styles.lessonInfo}>
              <Text style={styles.subject}>{lesson.subject}</Text>
              <View style={[
                styles.typeTag,
                { backgroundColor: lesson.type === 'lecture' ? '#E8F1FF' : 
                                 lesson.type === 'practice' ? '#E8FFE8' : '#FFE8E8' }
              ]}>
                <Text style={styles.typeText}>
                  {lesson.type === 'lecture' ? 'Лекция' :
                   lesson.type === 'practice' ? 'Практика' : 'Лабораторная'}
                </Text>
              </View>
              <Text style={styles.details}>{lesson.teacher}</Text>
              <Text style={styles.details}>Аудитория {lesson.room}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: theme.spacing.md,
  },
  lessonCard: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  timeContainer: {
    marginRight: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  lessonInfo: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  typeText: {
    fontSize: 12,
    color: '#666',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
}); 