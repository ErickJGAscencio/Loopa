import { habitStore } from '../../presentation/stores/HabitStore';
import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { HabitCard } from "../components/HabitCard";
import { observer } from "mobx-react-lite";
import { MonthlyCalendar } from '../components/MonthlyCalendar';
import { NewHabitModal } from '../components/NewHabitModal';
import { useNavigation } from '@react-navigation/native';
import { habitLogStore } from '../stores/HabitLogStore';
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { ProgressCard } from '../components/ProgressCard';

const HabitListScreen = observer(() => {
  const today = new Date();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation();
  const [sectionActive, setSectionActive] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const fetchHabits = async () => {
      await habitStore.loadHabits();
    };
    fetchHabits();
  }, []);

  useEffect(() => {
    const fetchHabitsLogs = async () => {
      await habitLogStore.loadLogs();
    };
    fetchHabitsLogs();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        onPress={() => {
  console.log(showMenu);       // ← muestra el valor actual (antes del cambio)
  setShowMenu(!showMenu);      // ← programa el cambio
}}
        >
          <FontAwesome6 name="bars" size={20} color="#1e1e1e" iconStyle='solid' />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        // onPress={() => setModalVisible(true)}
        >
          <FontAwesome6 name="bell" size={23} color="#1e1e1e" iconStyle='solid' />
        </TouchableOpacity>

      ),
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#ededed', gap: 10 }}>
      <ProgressCard />

      <View style={{
        backgroundColor: '#e4e4e4ff',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        padding: 10,
        justifyContent: 'space-between'
      }}>
        <TouchableOpacity
          style={[styles.button, sectionActive ? styles.sectionActive : styles.sectionDesactive]}
          onPress={() => setSectionActive(true)}
        >
          <FontAwesome6 name="list-check" size={15} color={sectionActive ? "#727272ff" : "#3b3b3bff"} iconStyle='solid' />
          <Text style={[styles.sectionText, sectionActive ? styles.activeText : styles.inactiveText]}>
            Hábitos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, sectionActive ? styles.sectionDesactive : styles.sectionActive]}
          onPress={() => setSectionActive(false)}
        >
          <FontAwesome6 name="calendar-days" size={15} color={sectionActive ? "#727272ff" : "#3b3b3bff"} iconStyle='solid' />
          <Text style={[styles.sectionText, sectionActive ? styles.inactiveText : styles.activeText]}>
            Calendario
          </Text>
        </TouchableOpacity>
      </View>


      {sectionActive ? (
        <>
          <View style={{ backgroundColor: '#e4e4e4ff', borderRadius: 15, padding: 20, width: '100%', marginTop: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={{ color: '#1e1e1e', fontSize: 20, fontWeight: 600 }}>
                {today.toLocaleString("es-MX", { month: "long", day: "numeric" })}
              </Text>
              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  justifyContent: 'center',
                  backgroundColor: '#1e1e1e',
                  alignItems: 'center',
                  borderRadius: 50,
                }}
                onPress={() => setModalVisible(true)}
              >
                <FontAwesome6 name="plus" size={15} color="#fff" iconStyle='solid' />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ width: '100%' }}>
              {habitStore.habits.map(habit => (
                <HabitCard key={habit.id} habit={habit} editable={true} />
              ))}
            </ScrollView>
          </View>
        </>
      ) : (
        <MonthlyCalendar />
      )}

      <NewHabitModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

      {showMenu && 
        <View style={styles.sideBar}>
          <Text style={styles.title}>Menú</Text>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Ir a hábitos')}>
            <Text style={styles.itemText}>Hábitos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => console.log('Ir a calendario')}>
            <Text style={styles.itemText}>Calendario</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={() => ("")}>
            <Text style={styles.itemText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
});

export default HabitListScreen;

const styles = StyleSheet.create({
  sideBar: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#EFEFEF',
    zIndex: 2,
    width: '70%',
    padding: 20,
  },
  title: {
    color: '#1e1e1e',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    paddingVertical: 12,
    borderBottomColor: '#1e1e1e',
    borderBottomWidth: 0.5,
  },
  itemText: {
    color: '#1e1e1e',
    fontSize: 16,
  },
  button: {
    width: '45%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  sectionActive: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionDesactive: {
    backgroundColor: '#e4e4e4ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  activeText: {
    color: '#1e1e1e',
    fontSize: 15,
    fontWeight: 500
  },
  inactiveText: {
    color: '#727272ff',
    fontSize: 15,
    fontWeight: 500
  },
});
