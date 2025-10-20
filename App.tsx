/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { AppState, StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTables, getDBConnection, resetHabitsPerDay } from './src/habit/infrastructure/datasources/HabitDatabase';
import HomeScreen from './src/habit/presentation/screens/HomeScreen';
import HabitsScreen from './src/habit/presentation/screens/HabitsScreen';
import ResumeScreen from './src/habit/presentation/screens/ResumeScreen';
import SettingsScreen from './src/habit/presentation/screens/SettingsScreen';
import RemindersScreen from './src/habit/presentation/screens/RemindersScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { appStore } from './src/habit/presentation/stores/AppStore';
import { SideBarMenu } from './src/habit/presentation/components/SideBarMenu';
import { habitStore } from './src/habit/presentation/stores/HabitStore';
import PushNotification from "react-native-push-notification";
import { notificationStore } from './src/habit/presentation/stores/NotificationStore';
import { habitsStatsStore } from './src/habit/presentation/stores/HabitsStatsStore';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [showMenu, setShowMenu] = useState<boolean>(false);

  PushNotification.createChannel( // Creamos el canal para las notificaciones
    {
      channelId: 'habits-channel',
      channelName: 'Recordatorios de hábitos',
      importance: 4,
      vibrate: true,
      soundName: 'notification_1.mp3'
    },
    (created: any) => console.log(`Canal creado: ${created}`)
  );

  PushNotification.configure({ // Iniciamos la configuracion del canal
    onNotification: (notification: any) => {
      console.log('Notificación recibida:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });

  const storeDate = async (value: string) => { // Almacenamos la fecha  en localStorage
    try {
      await AsyncStorage.setItem('date', value)
    } catch (error) {
      console.error("Error storing current date: ", error);
    }
  }

  const getStoreDate = async () => { // Obtenemos la fecha guardada en localStorage
    try {
      const value = await AsyncStorage.getItem('date');
      return value;
    } catch (error) {
      console.error("Error getting current date: ", error);
    }
  }

  useEffect(() => { // Revisamos si la aplicacion ha cambiado de estado segundo-plano -> primer-plano
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        console.log('La app volvió al primer plano');
        // Aquí podemos recargar datos, sincronizar, mostrar un mensaje, etc.
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => { // Hacemos la conexión a la db y creamos tablas
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

  const resetHabits = async () => { // Reseteamos los habitos cada día
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

  useEffect(() => { // Revisamos si la aplicacion ha cambiado de estado segundo-plano -> primer-plano | Revisamos fechas
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') {
        console.log("La app volvió al primer plano");

        const handleResume = async () => {
          const date = await getStoreDate();

          const currentDate = new Date();
          const year = currentDate.getFullYear();
          const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
          const day = currentDate.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          if (date == null) {
            console.log("No hay fecha guardada. Guardamos:", formattedDate);
            storeDate(formattedDate);
          } else {
            console.log("Ya hay fecha:", date);
            if (date !== formattedDate) {
              console.log("La fecha cambió. Reiniciamos hábitos.");
              storeDate(formattedDate);
              await resetHabits();
              habitStore.loadHabits();
            }
          }
        };

        handleResume(); // ← ejecutamos la función async
      }
    });

    return () => subscription.remove();
  }, []);


  useEffect(() => { // Iniciamos las notificaciones de la app
    async function initNotifications() {
      await notificationStore.loadSettings();
      notificationStore.syncHabitReminders(habitsStatsStore.activeHabits);
    }
    initNotifications();
  }, [habitsStatsStore.activeHabits]);



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
          <Stack.Screen
            name="resume"
            component={ResumeScreen}
            options={{
              title: 'Resumen',
              headerTintColor: '#1e1e1e',
              headerStyle: { backgroundColor: '#ededed' },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="reminders"
            component={RemindersScreen}
            options={{
              title: 'Recordatorios',
              headerTintColor: '#1e1e1e',
              headerStyle: { backgroundColor: '#ededed' },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="settings"
            component={SettingsScreen}
            options={{
              title: 'Configuraciones',
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
