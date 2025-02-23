import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { schedule } from '../data/schedule';

// Получаем уникальные предметы из расписания
const uniqueSubjects = [...new Set(
  Object.values(schedule)
    .flat()
    .map(item => item.subject)
)];

const grades = {
  average: 4.5, // Обновленный средний балл
  subjects: uniqueSubjects.map((subject, index) => ({
    id: (index + 1).toString(),
    name: subject,
    grade: Math.floor(Math.random() * 2) + 4, // Случайная оценка 4 или 5
    attendance: `${Math.floor(Math.random() * 11) + 90}%`, // Случайная посещаемость от 90% до 100%
    status: Math.random() > 0.3 ? 'Отл.' : 'Хор.', // 70% вероятность "Отл."
  })),
};

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Профиль студента */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle-outline" size={80} color={theme.colors.primary} />
          </View>
          <Text style={styles.studentName}>Дизенко Марк</Text>
          <Text style={styles.studentInfo}>Группа: 555ис</Text>
          <Text style={styles.studentInfo}>Курс: 4</Text>
        </View>

        {/* Средний балл */}
        <View style={styles.gradeCard}>
          <Text style={styles.cardTitle}>Средний балл</Text>
          <View style={styles.averageGradeContainer}>
            <Text style={styles.averageGrade}>{grades.average}</Text>
            <View style={styles.gradeIndicators}>
              <GradeIndicator label="Удовл." value="-" color="#FF5252" />
              <GradeIndicator label="Хор." value="-" color="#FFA726" />
              <GradeIndicator label="Отл." value="100%" color="#66BB6A" />
            </View>
          </View>
        </View>

        {/* Список предметов */}
        <View style={styles.subjectsContainer}>
          <Text style={styles.sectionTitle}>Текущие предметы</Text>
          {grades.subjects.map(subject => (
            <View key={subject.id} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: subject.status === 'Отл.' ? '#E8F5E9' : '#FFF3E0' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: subject.status === 'Отл.' ? '#66BB6A' : '#FFA726' }
                  ]}>{subject.status}</Text>
                </View>
              </View>
              <View style={styles.subjectDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Оценка</Text>
                  <Text style={styles.detailValue}>{subject.grade}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Посещаемость</Text>
                  <Text style={styles.detailValue}>{subject.attendance}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const GradeIndicator = ({ label, value, color }) => (
  <View style={styles.indicatorContainer}>
    <View style={[styles.indicator, { backgroundColor: color }]} />
    <Text style={styles.indicatorLabel}>{label}</Text>
    <Text style={styles.indicatorValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  studentInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  gradeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  averageGradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  averageGrade: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  gradeIndicators: {
    flex: 1,
    marginLeft: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  indicatorLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  indicatorValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  subjectsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  subjectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subjectDetails: {
    flexDirection: 'row',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
}); 