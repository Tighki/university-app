import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  StyleSheet, 
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text } from '../common/Text';
import { Button } from '../common/Button';
import { Chip } from '../common/Chip';
import { theme } from '../../theme/theme';

const LESSON_TYPES = [
  { id: 'lecture', label: 'Лекция' },
  { id: 'practice', label: 'Практика' },
  { id: 'lab', label: 'Лабораторная' },
];

export const LessonModal = ({ 
  visible, 
  onClose,
  onSave,
  initialData,
}) => {
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [teacher, setTeacher] = useState(initialData?.teacher || '');
  const [room, setRoom] = useState(initialData?.room || '');
  const [type, setType] = useState(initialData?.type || 'lecture');
  const [startTime, setStartTime] = useState(initialData?.startTime || '');
  const [endTime, setEndTime] = useState(initialData?.endTime || '');

  const handleSave = () => {
    onSave({
      subject,
      teacher,
      room,
      type,
      startTime,
      endTime,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text variant="h2" style={styles.title}>
            {initialData ? 'Редактировать занятие' : 'Новое занятие'}
          </Text>
          
          <ScrollView style={styles.form}>
            <Text style={styles.label}>Предмет</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Название предмета"
            />

            <Text style={styles.label}>Преподаватель</Text>
            <TextInput
              style={styles.input}
              value={teacher}
              onChangeText={setTeacher}
              placeholder="ФИО преподавателя"
            />

            <Text style={styles.label}>Аудитория</Text>
            <TextInput
              style={styles.input}
              value={room}
              onChangeText={setRoom}
              placeholder="Номер аудитории"
            />

            <Text style={styles.label}>Время начала</Text>
            <TextInput
              style={styles.input}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="09:00"
            />

            <Text style={styles.label}>Время окончания</Text>
            <TextInput
              style={styles.input}
              value={endTime}
              onChangeText={setEndTime}
              placeholder="10:30"
            />

            <Text style={styles.label}>Тип занятия</Text>
            <View style={styles.typeContainer}>
              {LESSON_TYPES.map((item) => (
                <Chip
                  key={item.id}
                  label={item.label}
                  selected={type === item.id}
                  onPress={() => setType(item.id)}
                  style={styles.typeChip}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttons}>
            <Button 
              title="Отмена" 
              onPress={onClose}
              variant="outline"
              style={styles.button}
            />
            <Button 
              title="Сохранить" 
              onPress={handleSave}
              style={styles.button}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.large,
    borderTopRightRadius: theme.borderRadius.large,
    padding: theme.spacing.lg,
    maxHeight: '80%',
  },
  title: {
    marginBottom: theme.spacing.lg,
  },
  form: {
    flex: 1,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.md,
  },
  typeChip: {
    marginBottom: theme.spacing.sm,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
}); 