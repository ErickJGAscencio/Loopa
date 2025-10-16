import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { BaseModal } from "./BaseModal";
import { useState } from "react";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { Habit } from "habit/domain/entities/Habit";
import { habitStore } from "../stores/HabitStore";
import Toast from "react-native-toast-message";

interface NoticeActionProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  currentHabit?: Habit;
}

export function NoticeAction({ modalVisible, setModalVisible, currentHabit }: NoticeActionProps) {

  const handleDeleteHabit = () => {
    try {
      if (currentHabit == null) return;
      habitStore.deleteHabit(currentHabit.id || 0);

      Toast.show({
        type: 'success',
        text1: `${currentHabit.name}`,
        text2: "Ha sido eliminado",
        position: 'bottom',
      });
    } catch (error) {
      console.log("Error deleting habit: ", error);
    }
  }

  return (
    <BaseModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)}>
      <View style={{ gap: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <FontAwesome6 name="trash-can" size={20} color="#1e1e1e" iconStyle='solid' />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' }}>
            Eliminar Hábito
          </Text>
        </View>
      </View>
      <View style={{ marginBlock: 27 }}>
        <Text style={{ color: '#1e1e1e', fontSize: 17 }}>¿Estás seguro de eliminar este hábito?</Text>
        <Text style={{ color: '#1e1e1e', fontSize: 20, fontWeight:500 }}>{currentHabit?.name}</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', bottom: 0 }}>

        <TouchableOpacity
          style={{
            width: 80,
            height: 45,
            backgroundColor: '#1e1e1e',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <FontAwesome6 name="arrow-left" size={15} color="#fff" iconStyle='solid' />

        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: 80,
            height: 45,
            backgroundColor: '#1e1e1e',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={() => {handleDeleteHabit(); setModalVisible(!modalVisible)}}
        >
          <FontAwesome6 name="check" size={15} color="#fff" iconStyle='solid' />
        </TouchableOpacity>
      </View>
    </BaseModal>
  )
}