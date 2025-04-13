import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { ScheduleFilters } from '../components/schedule/ScheduleFilters';
import { scheduleAPI } from '../services/database';
import { useAuth } from '../services/authContext';
import { Ionicons } from '@expo/vector-icons';

export const ScheduleScreen = ({ navigation }) => {
  // Убираем заголовок
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('пн');
  const [selectedType, setSelectedType] = useState('all');
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Соответствие между русскими и английскими типами занятий
  const typeMapping = {
    'лекция': 'lecture',
    'практика': 'practice',
    'лабораторная': 'lab'
  };
  
  // Обратное соответствие
  const reverseTypeMapping = {
    'lecture': 'лекция',
    'practice': 'практика',
    'lab': 'лабораторная'
  };

  useEffect(() => {
    loadSchedule();
  }, [user]);

  const loadSchedule = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const scheduleData = await scheduleAPI.getScheduleForUser(user.id);
      console.log('Полученное расписание:', JSON.stringify(scheduleData));
      setSchedule(scheduleData);
      
      // Отладка: выводим данные по дням
      for (const day in scheduleData) {
        if (scheduleData[day] && scheduleData[day].length > 0) {
          console.log(`День ${day}: ${scheduleData[day].length} занятий`);
          scheduleData[day].forEach(lesson => {
            console.log(`- ${lesson.subject} (${lesson.type})`);
          });
        } else {
          console.log(`День ${day}: нет занятий`);
        }
      }
    } catch (err) {
      console.error('Error loading schedule:', err);
      setError('Ошибка загрузки расписания');
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (day) => {
    // Преобразуем английский ID дня в русский
    setSelectedDay(dayIdMapping[day] || day);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Get lessons for the selected day
  const lessons = schedule[selectedDay] || [];

  // Filter lessons by type
  const filteredLessons = lessons.filter((lesson) => {
    if (selectedType === 'all') return true;
    
    // Проверяем соответствие типа на обоих языках
    const lessonType = lesson.type;
    return lessonType === selectedType || 
           typeMapping[lessonType] === selectedType ||
           reverseTypeMapping[selectedType] === lessonType;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScheduleFilters 
          selectedDay={selectedDay} 
          onDayChange={handleDayChange} 
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Загрузка расписания...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScheduleFilters 
        selectedDay={selectedDay} 
        onDayChange={handleDayChange} 
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.dayTitle}>
          {DAYS.find(d => dayIdMapping[d.id] === selectedDay || d.id === selectedDay)?.fullName || 'Расписание'}
        </Text>
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={loadSchedule}
          disabled={loading}
        >
          <Ionicons name="refresh" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {filteredLessons.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {error ? error : 'Нет занятий на этот день'}
            </Text>
            {!loading && (
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={loadSchedule}
              >
                <Text style={styles.retryButtonText}>Обновить</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredLessons.map((lesson) => (
            <View key={lesson.id} style={styles.lessonCard}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{lesson.startTime}</Text>
                <Text style={styles.time}>{lesson.endTime}</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.subject}>{lesson.subject}</Text>
                <View style={[
                  styles.typeTag,
                  { backgroundColor: 
                    lesson.type === 'lecture' || lesson.type === 'лекция' ? '#E8F1FF' : 
                    lesson.type === 'practice' || lesson.type === 'практика' ? '#E8FFE8' : 
                    lesson.type === 'lab' || lesson.type === 'лабораторная' ? '#FFE8E8' : '#F5F5F5'
                  }
                ]}>
                  <Text style={styles.typeText}>
                    {lesson.type === 'lecture' || lesson.type === 'лекция' ? 'Лекция' :
                     lesson.type === 'practice' || lesson.type === 'практика' ? 'Практика' : 
                     lesson.type === 'lab' || lesson.type === 'лабораторная' ? 'Лабораторная' : 
                     lesson.type}
                  </Text>
                </View>
                <Text style={styles.details}>{lesson.teacher}</Text>
                <Text style={styles.details}>Аудитория {lesson.room}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Массив с днями недели для отображения названия дня
const DAYS = [
  { id: 'mon', label: 'ПН', fullName: 'Понедельник', date: '25' },
  { id: 'tue', label: 'ВТ', fullName: 'Вторник', date: '26' },
  { id: 'wed', label: 'СР', fullName: 'Среда', date: '27' },
  { id: 'thu', label: 'ЧТ', fullName: 'Четверг', date: '28' },
  { id: 'fri', label: 'ПТ', fullName: 'Пятница', date: '29' },
  { id: 'sat', label: 'СБ', fullName: 'Суббота', date: '30' },
];

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  refreshButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 