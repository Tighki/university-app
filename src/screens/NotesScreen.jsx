import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { NoteModal } from '../components/notes/NoteModal';
import { NoteCard } from '../components/notes/NoteCard';
import { notesAPI } from '../services/database';
import { useAuth } from '../services/authContext';

export const NotesScreen = () => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const notesData = await notesAPI.getNotesForUser(user.id);
      setNotes(notesData);
    } catch (err) {
      console.error('Error loading notes:', err);
      setError('Ошибка загрузки заметок');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (note) => {
    try {
      const noteData = {
        userId: user.id,
        title: note.title,
        content: note.content
      };
      await notesAPI.addNote(noteData);
      loadNotes();
    } catch (err) {
      console.error('Error adding note:', err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await notesAPI.deleteNote(id);
      loadNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Загрузка заметок...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {notes.length === 0 ? (
          <Text style={styles.emptyText}>
            {error ? error : 'У вас пока нет заметок'}
          </Text>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.content}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
});
