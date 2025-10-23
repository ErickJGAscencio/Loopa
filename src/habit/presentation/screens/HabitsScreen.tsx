import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { habitStore } from '../stores/HabitStore'
import { appStore } from '../stores/AppStore';
import { HabitInfoCard } from '../components/HabitInfoCard';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { observer } from 'mobx-react-lite';
import { Habit } from 'habit/domain/entities/Habit';
import {  NoticeAction } from '../components/NoticeAction';
import { EditHabitModal } from '../components/EditHabitModal';

const HabitsScreen = observer(() => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentHabit, setCurrentHabit] = useState<Habit>();
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!appStore.dbReady) return;

    const fetchHabits = async () => {
      await habitStore.loadHabits();
    };
    fetchHabits();
  }, []);



  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
        {/* <View style={{ width: '100%' }}>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'flex-end' }}>
            <FontAwesome5 name='bars' size={20} color={'#1e1e1e'} iconStyle='solid' />
            <FontAwesome5 name='filter' size={20} color={'#1e1e1e'} iconStyle='solid' />
          </TouchableOpacity>
        </View> */}

        {habitStore.habits.length > 0 ?
          habitStore.habits.map(habit => (
            <HabitInfoCard key={habit.id} habit={habit} setModalVisible={setModalVisible} setEditModalVisible={setEditModalVisible} setCurrentHabit={setCurrentHabit} />
          )
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#b7b7b7ff' }}>Aún no hay hábitos</Text>
            </View>
          )
        }
      </ScrollView>

      <NoticeAction 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        currentHabit={currentHabit} />

      <EditHabitModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        currentHabit={currentHabit}
      />

    </>
  )
})

export default HabitsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ededed'
  }
});