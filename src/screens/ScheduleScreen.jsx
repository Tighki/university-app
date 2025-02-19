import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { Text } from '../components/common/Text';
import { Button } from '../components/common/Button';
import { TimeSlot } from '../components/schedule/TimeSlot';
import { AnimatedLessonCard } from '../components/schedule/AnimatedLessonCard';
import { ScheduleFilters } from '../components/schedule/ScheduleFilters';
import { LessonModal } from '../components/schedule/LessonModal';
import { theme } from '../theme/theme';

export const ScheduleScreen = () => {
  const [selectedDay, setSelectedDay] = useState('mon');
  const [selectedType, setSelectedType] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [lessons, setLessons] = useState([
    {
      id: '1',
      day: 'mon',
      startTime: '09:00',
      endTime: '10:30',
      subject: 'Математический анализ',
      teacher: 'Петров И.И.',
      room: '301',
      type: 'lecture',
    },
    {
      id: '2',
      day: 'mon',
      startTime: '10:40',
      endTime: '12:10',
      subject: 'Программирование',
      teacher: 'Иванов А.А.',
      room: '215',
      type: 'practice',
    },
  ]);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const dayMatch = lesson.day === selectedDay;
      const typeMatch = selectedType === 'all' || lesson.type === selectedType;
      return dayMatch && typeMatch;
    });
  }, [selectedDay, selectedType, lessons]);

  const handleAddLesson = () => {
    setEditingLesson(null);
    setModalVisible(true);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setModalVisible(true);
  };

  const handleSaveLesson = (lessonData) => {
    if (editingLesson) {
      // Редактирование существующего занятия
      setLessons(lessons.map(lesson => 
        lesson.id === editingLesson.id 
          ? { ...lesson, ...lessonData, day: selectedDay }
          : lesson
      ));
    } else {
      // Добавление нового занятия
      const newLesson = {
        id: Date.now().toString(),
        day: selectedDay,
        ...lessonData,
      };
      setLessons([...lessons, newLesson]);
    }
  };

  const handleDeleteLesson = (lessonId) => {
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2">Расписание</Text>
        <Button 
          title="Добавить" 
          onPress={handleAddLesson}
          variant="primary"
          style={styles.addButton}
        />
      </View>

      <ScheduleFilters
        selectedDay={selectedDay}
        selectedType={selectedType}
        onDayChange={setSelectedDay}
        onTypeChange={setSelectedType}
      />

      <ScrollView style={styles.content}>
        {filteredLessons.map((lesson, index) => (
          <Animated.View 
            key={lesson.id} 
            style={styles.lessonRow}
            entering={FadeInUp.delay(index * 100)}
            layout={Layout.springify()}
          >
            <TimeSlot 
              startTime={lesson.startTime} 
              endTime={lesson.endTime}
            />
            <AnimatedLessonCard 
              {...lesson}
              onPress={() => handleEditLesson(lesson)}
              onLongPress={() => handleDeleteLesson(lesson.id)}
            />
          </Animated.View>
        ))}
        {filteredLessons.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Нет занятий в этот день
            </Text>
          </View>
        )}
      </ScrollView>

      <LessonModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setEditingLesson(null);
        }}
        onSave={handleSaveLesson}
        initialData={editingLesson}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.small,
  },
  addButton: {
    minWidth: 100,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  lessonRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyStateText: {
    color: theme.colors.textSecondary,
  },
}); 