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
  return (
    <Card style={[styles.container, style]}>
      <Text variant="h3" style={styles.subject}>{subject}</Text>
      <View style={styles.details}>
        <Text style={styles.info}>{teacher}</Text>
        <Text style={styles.info}>Аудитория {room}</Text>
      </View>
      <View style={[styles.tag, styles[type]]}>
        <Text style={styles.tagText}>{type}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  subject: {
    marginBottom: theme.spacing.xs,
  },
  details: {
    marginTop: theme.spacing.xs,
  },
  info: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.xs,
  },
  tag: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
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