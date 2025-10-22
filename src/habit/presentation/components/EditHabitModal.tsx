import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Habit } from 'habit/domain/entities/Habit';
import { habitStore } from '../stores/HabitStore';
import { BaseModal } from './BaseModal';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  currentHabit?: Habit;
}

export function EditHabitModal({ modalVisible, setModalVisible, currentHabit }: Props) {
  const [name, setName] = useState(currentHabit?.name || '');

  const handleSave = () => {
    if (currentHabit?.id) {
      habitStore.updateHabit(currentHabit.id, name);
      setName("");
      setModalVisible(false);
    }
  };

  return (
    <BaseModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)}>
      <View style={{ gap: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <FontAwesome5 name="edit" size={20} color="#1e1e1e" iconStyle='solid' />
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' }}>
            Editar Hábito
          </Text>
        </View>
      </View>
      <View style={{ marginBlock: 27 }}>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombre del hábito"
        />
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
          onPress={() => { handleSave(); setModalVisible(!modalVisible) }}
        >
          <FontAwesome6 name="check" size={15} color="#fff" iconStyle='solid' />
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginTop: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
