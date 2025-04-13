import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarScreen } from '../screens/CalendarScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { NotesScreen } from '../screens/NotesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../services/authContext';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { logout } = useAuth();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
        },
      }}
    >
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen}
        options={{
          tabBarLabel: 'Расписание',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Мероприятия',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Notes" 
        component={NotesScreen}
        options={{
          tabBarLabel: 'Заметки',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Профиль',
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 16 }} 
              onPress={logout}
            >
              <Ionicons name="exit-outline" size={24} color={theme.colors.error} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}; 