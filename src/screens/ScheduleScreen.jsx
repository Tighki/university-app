import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { ScheduleFilters } from '../components/schedule/ScheduleFilters';
import { scheduleAPI } from '../services/database';
import { useAuth } from '../services/authContext';

export const ScheduleScreen = ({ navigation }) => {
  // Убираем заголовок
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('mon');
  const [selectedType, setSelectedType] = useState('all');
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSchedule();
  }, [user]);

  const loadSchedule = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const scheduleData = await scheduleAPI.getScheduleForUser(user.id);
      setSchedule(scheduleData);
    } catch (err) {
      console.error('Error loading schedule:', err);
      setError('Ошибка загрузки расписания');
    } finally {
      setLoading(false);
    }
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Get lessons for the selected day
  const lessons = schedule[selectedDay] || [];

  // Filter lessons by type
  const filteredLessons = lessons.filter((lesson) => {
    return selectedType === 'all' || lesson.type === selectedType;
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
      <ScrollView style={styles.content}>
        {filteredLessons.length === 0 ? (
          <Text style={styles.emptyText}>
            {error ? error : 'Нет занятий на этот день'}
          </Text>
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
          ))
        )}
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
}); 