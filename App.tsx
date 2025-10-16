/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createTables, getDBConnection, resetHabitsPerDay } from './src/habit/infrastructure/datasources/HabitDatabase';
import HomeScreen from './src/habit/presentation/screens/HomeScreen';
import HabitsScreen from './src/habit/presentation/screens/HabitsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { appStore } from './src/habit/presentation/stores/AppStore';
import { SideBarMenu } from './src/habit/presentation/components/SideBarMenu';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const storeDate = async (value: string) => {
    try {
      await AsyncStorage.setItem('date', value)
    } catch (error) {
      console.error("Error storing current date: ", error);
    }
  }

  const getStoreDate = async () => {
    try {
      const value = await AsyncStorage.getItem('date');
      return value;
    } catch (error) {
      console.error("Error getting current date: ", error);
    }
  }

  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      try {
        await createTables(db);
        appStore.setDbReady(true);
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

  const resetHabits = async () => {
    const db = await getDBConnection();
    try {
      await resetHabitsPerDay(db);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al crear la base de datos',
        text2: String(error),
      });
    }
  };

  useEffect(() => {
    const checkDate = async () => {
      const date = await getStoreDate();
      if (date == null) {
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses van del 0 a 11
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        console.log(formattedDate); // Ejemplo: "2025/10/14"

        storeDate(formattedDate)
      } else {
        console.log("Ya hay fecha");
        const storedDate = await getStoreDate();
        console.log("Stored date: ", storedDate);

        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Los meses van del 0 a 11
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        console.log(`Evaluamos: , ${formattedDate} != ${year}-${month}-${day}`)
        if (storedDate != formattedDate) {
          console.log("Sí es diferente");
          storeDate(formattedDate);
          await resetHabits();
        }
      }
    };
    checkDate();
  }, []);


  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <NavigationContainer>
        <SideBarMenu setVisible={() => setShowMenu(!showMenu)} visible={false} />
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: 'LOOPA',
              headerTintColor: '#1e1e1e',
              headerStyle: { backgroundColor: '#ededed' },
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerLeft: () => <View />,
              headerRight: () => <View />, // placeholder
            }}
          />
          <Stack.Screen
            name="habits"
            component={HabitsScreen}
            options={{
              title: 'Mis Hábitos',
              headerTintColor: '#1e1e1e',
              headerStyle: { backgroundColor: '#ededed' },
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
