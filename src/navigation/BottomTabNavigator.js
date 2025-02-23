import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CalendarScreen } from '../screens/CalendarScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
        options={{
          tabBarLabel: 'Расписание',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Events" 
        component={CalendarScreen} 
        options={{
          tabBarLabel: 'Мероприятия',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-list" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; 