import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../common/Card';
import { Text } from '../common/Text';
import { theme } from '../../theme/theme';

export const LessonCard = ({ 
  subject,
  teacher,
  room,
  type,
  style,
}) => {
  const typeLabels = {
    'lecture': 'Лекция',
    'practice': 'Практика',
    'lab': 'Лабораторная'
  };

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.contentContainer}>
        <Text style={styles.subject} numberOfLines={2}>{subject}</Text>
        <View style={[styles.tag, styles[type]]}>
          <Text style={styles.tagText}>{typeLabels[type]}</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.info}>{teacher}</Text>
          <Text style={styles.info}>Аудитория {room}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: theme.spacing.md,
    padding: theme.spacing.md,
  },
  contentContainer: {
    width: '100%',
  },
  subject: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
    flexWrap: 'wrap',
    color: theme.colors.text,
  },
  details: {
    marginTop: theme.spacing.sm,
  },
  info: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: 2,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.xs,
  },
  lecture: {
    backgroundColor: '#E3F2FD',
  },
  practice: {
    backgroundColor: '#E8F5E9',
  },
  lab: {
    backgroundColor: '#FFF3E0',
  },
  tagText: {
    fontSize: 12,
    color: theme.colors.text,
  },
}); 