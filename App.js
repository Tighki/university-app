import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/services/authContext';
import Database, { initDatabase, insertInitialData } from './src/services/database';
import { ActivityIndicator, View, Text } from 'react-native';
import { theme } from './src/theme/theme';

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [error, setError] = useState(null);

  // Инициализация базы данных при первом запуске
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDatabase();
        await insertInitialData();
        setDbInitialized(true);
      } catch (err) {
        console.error('Error initializing database:', err);
        setError('Ошибка инициализации базы данных');
      }
    };

    initializeDatabase();
  }, []);

  if (!dbInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', padding: 20 }}>{error}</Text>
        ) : (
          <>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 16, color: theme.colors.textSecondary }}>
              Инициализация базы данных...
            </Text>
          </>
        )}
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
