import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScheduleScreen } from './src/screens/ScheduleScreen';
import { NotesScreen } from './src/screens/NotesScreen';
import { CalendarScreen } from './src/screens/CalendarScreen';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4A90E2',
          tabBarInactiveTintColor: '#A7C7E7',
          headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen 
          name="Schedule" 
          component={ScheduleScreen}
          options={{
            tabBarLabel: 'Расписание',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Notes" 
          component={NotesScreen}
          options={{
            tabBarLabel: 'Заметки',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document-text-outline" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Calendar" 
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Календарь',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
