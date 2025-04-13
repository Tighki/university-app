import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../components/common/Text';
import { theme } from '../../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { usersAPI, scheduleAPI } from '../../services/database';
import { useAuth } from '../../services/authContext';

export const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useAuth();
  
  // Состояние для модальных окон
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userSchedule, setUserSchedule] = useState({});
  
  // Состояние для новых пользователей и занятий
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    fullName: '',
    groupNumber: '',
    course: 1,
    isAdmin: false
  });
  
  const [newLesson, setNewLesson] = useState({
    userId: '',
    day: 'пн',
    subject: '',
    teacher: '',
    room: '',
    type: 'лекция',
    startTime: '09:00',
    endTime: '10:30'
  });

  // Добавляем варианты для выбора дня недели и типа занятия
  const dayOptions = [
    { label: 'Понедельник', value: 'пн' },
    { label: 'Вторник', value: 'вт' },
    { label: 'Среда', value: 'ср' },
    { label: 'Четверг', value: 'чт' },
    { label: 'Пятница', value: 'пт' },
    { label: 'Суббота', value: 'сб' },
    { label: 'Воскресенье', value: 'вс' }
  ];

  const lessonTypeOptions = [
    { label: 'Лекция', value: 'лекция' },
    { label: 'Практика', value: 'практика' },
    { label: 'Лабораторная', value: 'лабораторная' }
  ];

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await usersAPI.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);
  
  const loadUserSchedule = async (userId) => {
    try {
      const schedule = await scheduleAPI.getScheduleForUser(userId);
      setUserSchedule(schedule);
    } catch (err) {
      console.error('Error loading schedule:', err);
      Alert.alert('Ошибка', 'Не удалось загрузить расписание');
    }
  };

  const handleDeleteUser = (user) => {
    Alert.alert(
      'Удаление пользователя',
      `Вы уверены, что хотите удалить пользователя ${user.full_name}?`,
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await usersAPI.deleteUser(user.id);
              Alert.alert('Успешно', 'Пользователь успешно удален');
              loadUsers(); // Перезагружаем список пользователей
            } catch (err) {
              Alert.alert('Ошибка', 'Не удалось удалить пользователя');
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход из системы',
      'Вы уверены, что хотите выйти из панели администратора?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };
  
  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.fullName || !newUser.groupNumber) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }
    
    try {
      await usersAPI.register({
        ...newUser,
        is_admin: newUser.isAdmin ? 1 : 0,
      });
      
      Alert.alert('Успешно', 'Пользователь успешно добавлен');
      setShowAddUserModal(false);
      setNewUser({
        username: '',
        password: '',
        fullName: '',
        groupNumber: '',
        course: 1,
        isAdmin: false
      });
      loadUsers();
    } catch (err) {
      Alert.alert('Ошибка', 'Не удалось добавить пользователя');
    }
  };
  
  const handleAddLesson = async () => {
    if (!newLesson.subject || !newLesson.teacher || !newLesson.room) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
      return;
    }
    
    try {
      await scheduleAPI.addLesson({
        ...newLesson,
        userId: selectedUser.id
      });
      
      Alert.alert('Успешно', 'Занятие успешно добавлено');
      
      // Перезагружаем расписание пользователя
      loadUserSchedule(selectedUser.id);
      
      // Сбрасываем форму добавления и закрываем модальное окно
      setShowAddLessonModal(false);
      setNewLesson({
        userId: selectedUser.id,
        day: 'пн',
        subject: '',
        teacher: '',
        room: '',
        type: 'лекция',
        startTime: '09:00',
        endTime: '10:30'
      });
    } catch (err) {
      console.error('Ошибка при добавлении занятия:', err);
      Alert.alert('Ошибка', 'Не удалось добавить занятие');
    }
  };
  
  const handleDeleteLesson = (lessonId) => {
    Alert.alert(
      'Удаление занятия',
      'Вы уверены, что хотите удалить это занятие?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: async () => {
            try {
              await scheduleAPI.deleteLesson(lessonId);
              Alert.alert('Успешно', 'Занятие успешно удалено');
              loadUserSchedule(selectedUser.id);
            } catch (err) {
              Alert.alert('Ошибка', 'Не удалось удалить занятие');
            }
          },
        },
      ]
    );
  };
  
  const showScheduleModal = (user) => {
    setSelectedUser(user);
    loadUserSchedule(user.id);
  };
  
  const renderDaySchedule = (day, lessons) => {
    const dayNames = {
      'пн': 'Понедельник',
      'вт': 'Вторник',
      'ср': 'Среда',
      'чт': 'Четверг',
      'пт': 'Пятница',
      'сб': 'Суббота',
      'вс': 'Воскресенье',
      // Сохраним обратную совместимость для старых данных
      'mon': 'Понедельник',
      'tue': 'Вторник',
      'wed': 'Среда',
      'thu': 'Четверг',
      'fri': 'Пятница',
      'sat': 'Суббота',
      'sun': 'Воскресенье'
    };
    
    return (
      <View key={day} style={styles.dayContainer}>
        <Text style={styles.dayTitle}>{dayNames[day] || day}</Text>
        {lessons.length === 0 ? (
          <Text style={styles.emptyDayText}>Нет занятий</Text>
        ) : (
          lessons.map((lesson) => (
            <View key={lesson.id} style={styles.lessonCard}>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                <Text style={styles.lessonDetails}>
                  {lesson.teacher} | Аудитория: {lesson.room} | {lesson.startTime}-{lesson.endTime}
                </Text>
                <Text style={[
                  styles.lessonType,
                  lesson.type === 'лекция' || lesson.type === 'lecture' ? styles.lectureText : 
                  lesson.type === 'практика' || lesson.type === 'practice' ? styles.practiceText : 
                  lesson.type === 'лабораторная' || lesson.type === 'lab' ? styles.labText : null
                ]}>
                  {lesson.type === 'лекция' || lesson.type === 'lecture' ? 'Лекция' : 
                   lesson.type === 'практика' || lesson.type === 'practice' ? 'Практика' : 
                   lesson.type === 'лабораторная' || lesson.type === 'lab' ? 'Лабораторная' : lesson.type}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteLessonButton}
                onPress={() => handleDeleteLesson(parseInt(lesson.id))}
              >
                <Ionicons name="trash-outline" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    );
  };

  // Сбрасываем форму когда выбирается новый пользователь
  useEffect(() => {
    if (selectedUser) {
      setNewLesson({
        userId: selectedUser.id,
        day: 'пн',
        subject: '',
        teacher: '',
        room: '',
        type: 'лекция',
        startTime: '09:00',
        endTime: '10:30'
      });
    }
  }, [selectedUser]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Управление пользователями</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Управление пользователями</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadUsers}>
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Управление пользователями</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.refreshButton} onPress={loadUsers}>
            <Ionicons name="refresh" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="exit-outline" size={24} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        {users.length === 0 ? (
          <Text style={styles.emptyText}>Нет пользователей</Text>
        ) : (
          users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.full_name}</Text>
                <Text style={styles.userDetails}>
                  Логин: {user.username} | Группа: {user.group_number} | Курс: {user.course}
                </Text>
                <Text
                  style={[
                    styles.roleText,
                    { color: user.is_admin ? theme.colors.error : theme.colors.success },
                  ]}
                >
                  {user.is_admin ? 'Администратор' : 'Студент'}
                </Text>
              </View>
              
              {!user.is_admin && (
                <View style={styles.userButtons}>
                  <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => showScheduleModal(user)}
                  >
                    <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.userButton}
                    onPress={() => handleDeleteUser(user)}
                  >
                    <Ionicons name="trash-outline" size={24} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setShowAddUserModal(true)}
      >
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      
      {/* Модальное окно для добавления пользователя */}
      <Modal
        visible={showAddUserModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Добавление пользователя</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Логин:</Text>
              <TextInput
                style={styles.input}
                value={newUser.username}
                onChangeText={(text) => setNewUser(prev => ({...prev, username: text}))}
                placeholder="Введите логин"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Пароль:</Text>
              <TextInput
                style={styles.input}
                value={newUser.password}
                onChangeText={(text) => setNewUser(prev => ({...prev, password: text}))}
                placeholder="Введите пароль"
                secureTextEntry
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ФИО:</Text>
              <TextInput
                style={styles.input}
                value={newUser.fullName}
                onChangeText={(text) => setNewUser(prev => ({...prev, fullName: text}))}
                placeholder="Введите ФИО"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Группа:</Text>
              <TextInput
                style={styles.input}
                value={newUser.groupNumber}
                onChangeText={(text) => setNewUser(prev => ({...prev, groupNumber: text}))}
                placeholder="Введите номер группы"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Курс:</Text>
              <TextInput
                style={styles.input}
                value={String(newUser.course)}
                onChangeText={(text) => setNewUser(prev => ({...prev, course: parseInt(text) || 1}))}
                placeholder="Введите курс"
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, newUser.isAdmin && styles.checkboxActive]}
                onPress={() => setNewUser(prev => ({...prev, isAdmin: !prev.isAdmin}))}
              >
                {newUser.isAdmin && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Администратор</Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddUserModal(false)}
              >
                <Text style={styles.cancelButtonText}>Отмена</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddUser}
              >
                <Text style={styles.saveButtonText}>Добавить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Модальное окно для управления расписанием */}
      <Modal
        visible={!!selectedUser}
        transparent={false}
        animationType="slide"
      >
        <SafeAreaView style={styles.scheduleContainer}>
          <View style={styles.scheduleHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setSelectedUser(null);
                setShowAddLessonModal(false);
              }}
            >
              <Ionicons name="chevron-back" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
            <Text style={styles.scheduleTitle}>
              Расписание: {selectedUser?.full_name}
            </Text>
            <TouchableOpacity
              style={styles.addLessonButton}
              onPress={() => setShowAddLessonModal(true)}
            >
              <Ionicons name="add-circle" size={30} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scheduleContent}>
            {selectedUser && Object.keys(userSchedule).map(day => (
              renderDaySchedule(day, userSchedule[day] || [])
            ))}
          </ScrollView>
          
          {/* Встроенное модальное окно добавления занятия */}
          {showAddLessonModal && (
            <View style={styles.fullScreenModal}>
              <View style={styles.modalView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Добавление занятия</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowAddLessonModal(false)}
                  >
                    <Ionicons name="close" size={24} color="#999" />
                  </TouchableOpacity>
                </View>
                
                <ScrollView style={styles.modalScrollView}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>День недели:</Text>
                    <View style={styles.selectContainer}>
                      <TouchableOpacity 
                        style={styles.customSelect}
                        onPress={() => {
                          Alert.alert(
                            'Выберите день недели',
                            '',
                            [
                              ...dayOptions.map(option => ({
                                text: option.label,
                                onPress: () => setNewLesson(prev => ({...prev, day: option.value}))
                              })),
                              { text: 'Отмена', style: 'cancel' }
                            ]
                          );
                        }}
                      >
                        <Text style={styles.selectText}>
                          {dayOptions.find(option => option.value === newLesson.day)?.label || 'Выберите день недели'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Предмет:</Text>
                    <TextInput
                      style={styles.input}
                      value={newLesson.subject}
                      onChangeText={(text) => setNewLesson(prev => ({...prev, subject: text}))}
                      placeholder="Название предмета"
                      placeholderTextColor="#777777"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Преподаватель:</Text>
                    <TextInput
                      style={styles.input}
                      value={newLesson.teacher}
                      onChangeText={(text) => setNewLesson(prev => ({...prev, teacher: text}))}
                      placeholder="ФИО преподавателя"
                      placeholderTextColor="#777777"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Аудитория:</Text>
                    <TextInput
                      style={styles.input}
                      value={newLesson.room}
                      onChangeText={(text) => setNewLesson(prev => ({...prev, room: text}))}
                      placeholder="Номер аудитории"
                      placeholderTextColor="#777777"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Тип занятия:</Text>
                    <View style={styles.selectContainer}>
                      <TouchableOpacity 
                        style={styles.customSelect}
                        onPress={() => {
                          Alert.alert(
                            'Выберите тип занятия',
                            '',
                            [
                              ...lessonTypeOptions.map(option => ({
                                text: option.label,
                                onPress: () => setNewLesson(prev => ({...prev, type: option.value}))
                              })),
                              { text: 'Отмена', style: 'cancel' }
                            ]
                          );
                        }}
                      >
                        <Text style={styles.selectText}>
                          {lessonTypeOptions.find(option => option.value === newLesson.type)?.label || 'Выберите тип занятия'}
                        </Text>
                        <Ionicons name="chevron-down" size={20} color={theme.colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <View style={styles.timeContainer}>
                    <View style={styles.timeInput}>
                      <Text style={styles.inputLabel}>Начало:</Text>
                      <TextInput
                        style={styles.input}
                        value={newLesson.startTime}
                        onChangeText={(text) => setNewLesson(prev => ({...prev, startTime: text}))}
                        placeholder="HH:MM"
                        placeholderTextColor="#777777"
                      />
                    </View>
                    
                    <View style={styles.timeInput}>
                      <Text style={styles.inputLabel}>Конец:</Text>
                      <TextInput
                        style={styles.input}
                        value={newLesson.endTime}
                        onChangeText={(text) => setNewLesson(prev => ({...prev, endTime: text}))}
                        placeholder="HH:MM"
                        placeholderTextColor="#777777"
                      />
                    </View>
                  </View>
                </ScrollView>
                
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowAddLessonModal(false)}
                  >
                    <Text style={styles.cancelButtonText}>Отмена</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton]}
                    onPress={handleAddLesson}
                  >
                    <Text style={styles.saveButtonText}>Добавить</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: theme.spacing.sm,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
  },
  logoutButton: {
    padding: theme.spacing.sm,
  },
  addLessonButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  userButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userButton: {
    padding: theme.spacing.sm,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  // Модальное окно
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.md,
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '95%',
    padding: theme.spacing.lg,
    maxHeight: '90%',
    ...theme.shadows.medium,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    marginBottom: 4,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    padding: theme.spacing.sm,
    fontSize: 16,
    color: '#000000',
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    paddingHorizontal: theme.spacing.sm,
  },
  selectIcon: {
    marginRight: theme.spacing.sm,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  timeInput: {
    width: '48%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 4,
    marginLeft: theme.spacing.sm,
  },
  cancelButton: {
    backgroundColor: theme.colors.lightGray,
  },
  cancelButtonText: {
    color: theme.colors.textPrimary,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: theme.spacing.md,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
  },
  dayContainer: {
    marginBottom: 32,
  },
  dayTitle: {
    fontSize: 22,
    color: '#4A80F0',
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  emptyDayText: {
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.md,
  },
  lessonCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    ...theme.shadows.small,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonSubject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  lessonDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  lessonType: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary,
  },
  lectureText: {
    color: '#4A80F0',
  },
  practiceText: {
    color: '#4CAF50',
  },
  labText: {
    color: '#FF9800',
  },
  deleteLessonButton: {
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.sm,
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -24,
  },
  scheduleContent: {
    flex: 1,
    padding: 16,
  },
  fullScreenModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
  customSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 4,
  },
  selectText: {
    fontSize: 16,
    color: '#000000',
  },
  selectContainer: {
    marginTop: 4,
  },
});