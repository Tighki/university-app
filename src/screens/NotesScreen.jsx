import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NoteModal } from '../components/notes/NoteModal';
import { NoteCard } from '../components/notes/NoteCard';

export const NotesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleAddNote = (note) => {
    setNotes([...notes, { id: Date.now().toString(), ...note }]);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {notes.map(note => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            onDelete={() => handleDeleteNote(note.id)}
          />
        ))}
        {notes.length === 0 && (
          <Text style={styles.emptyText}>У вас пока нет заметок</Text>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <NoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddNote}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
});
