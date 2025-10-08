/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { createTables, getDBConnection } from './src/habit/infrastructure/datasources/HabitDatabase';
import HabitListScreen from './src/habit/presentation/screens/HabitListScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(()=>{
    const initDB = async ()=>{
      const db = await getDBConnection();
      await createTables(db);
    }

    initDB();
  },[])

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <AppContent /> */}
      <HabitListScreen />
    </SafeAreaProvider>
  );
}

// import { habitStore } from './src/habit/presentation/stores/HabitStore';

function AppContent() {
    // const { habits, loadHabits } = habitStore;                                                 
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
