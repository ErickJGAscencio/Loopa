/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createTables, getDBConnection } from './src/habit/infrastructure/datasources/HabitDatabase';
import HabitListScreen from './src/habit/presentation/screens/HabitListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';


  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      try {
        await createTables(db);

        Toast.show({
          type: 'success',
          text1: 'Base de datos creada',
          text2: 'La tabla de hábitos está lista',
          position: 'bottom',
        });

      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error al crear la base de datos',
          text2: String(error),
        });
      }
    };
    initDB();
  }, []);


  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HabitList">
          <Stack.Screen
            name="HabitList"
            component={HabitListScreen}
            options={{
              title: 'LOOPA',
              headerTintColor: '#1e1e1e',
              headerStyle: { backgroundColor: '#ededed' },
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerLeft: () => <View><Text>User</Text></View>,
              headerRight: () => <View style={{ width: 30 }} />, // placeholder
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
