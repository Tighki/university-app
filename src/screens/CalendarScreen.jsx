import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../components/common/Text';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import Reanimated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const events = [
  {
    id: '1',
    title: 'Вебинар по программированию',
    date: '25 октября',
    time: '18:00',
    description: 'Погрузитесь в мир современной разработки. Узнайте о последних трендах в программировании.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500',
    location: 'Онлайн',
    participants: 42
  },
  {
    id: '2',
    title: 'Семинар по математике',
    date: '26 октября',
    time: '14:00',
    description: 'Углубленное изучение математического анализа. Практические примеры и решение задач.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500',
    location: 'Аудитория 301',
    participants: 28
  },
  {
    id: '3',
    title: 'Конференция по ИТ',
    date: '28 октября',
    time: '10:00',
    description: 'Ведущие специалисты расскажут о новых технологиях и поделятся опытом работы в крупных компаниях.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500',
    location: 'Главный конференц-зал',
    participants: 156
  },
];

const { width } = Dimensions.get('window');

export const CalendarScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [fullName, setFullName] = useState('');
  const [groupNumber, setGroupNumber] = useState('');
  const [course, setCourse] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const checkmarkScale = useSharedValue(0);

  const handleRegisterPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleSubmit = (eventId) => {
    setRegisteredEvents(prev => new Set([...prev, eventId]));
    setModalVisible(false);
    setFullName('');
    setGroupNumber('');
    setCourse('');
    
    // Animation configuration for checkmark badge
    checkmarkScale.value = withSequence(
      withSpring(1, { damping: 8 }),
      withTiming(1, { duration: 1000 })
    );
  };

  const CheckmarkBadge = ({ isRegistered }) => {
    if (!isRegistered) return null;

    return (
      <View style={styles.checkmarkBadge}>
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      </View>
    );
  };

  // Заменяем Animated.View на Reanimated.View
  const AnimatedView = Reanimated.createAnimatedComponent(View);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {events.map(event => (
          <View key={event.id} style={styles.eventCard}>
            <Image
              source={{ uri: event.image }}
              style={styles.eventImage}
              resizeMode="cover"
            />
            <View style={styles.eventContent}>
              <View style={styles.dateTimeContainer}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.dateTimeText}>{event.date} • {event.time}</Text>
              </View>
              
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
              
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.locationText}>{event.location}</Text>
              </View>
              
              <View style={styles.footer}>
                <View style={styles.participantsContainer}>
                  <Ionicons name="people-outline" size={16} color="#666" />
                  <Text style={styles.participantsText}>{event.participants} участников</Text>
                </View>
                
                {registeredEvents.has(event.id) ? (
                  <AnimatedView style={[styles.registeredContainer]}>
                    <Text style={styles.registeredText}>Вы зарегистрированы</Text>
                    <CheckmarkBadge isRegistered={true} />
                  </AnimatedView>
                ) : (
                  <TouchableOpacity 
                    style={styles.registerButton}
                    onPress={() => handleRegisterPress(event)}
                  >
                    <Text style={styles.registerButtonText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Модальное окно для регистрации */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Регистрация на мероприятие</Text>
            <Text style={styles.label}>ФИО</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите ваше ФИО"
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={styles.label}>Номер группы</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите номер группы"
              value={groupNumber}
              onChangeText={setGroupNumber}
            />
            <Text style={styles.label}>Курс</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите курс"
              value={course}
              onChangeText={setCourse}
            />
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={() => handleSubmit(selectedEvent?.id)}
            >
              <Text style={styles.submitButtonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventContent: {
    padding: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTimeText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF0000',
  },
  closeButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  checkmarkBadge: {
    position: 'absolute',
    right: -12,
    top: -12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  registeredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  
  registeredText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
});
