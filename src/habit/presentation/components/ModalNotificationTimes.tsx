import React, { useState } from 'react'
import { BaseModal } from './BaseModal';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { TimePicker } from './TimePicker';
import { notificationStore } from '../stores/NotificationStore';
import Chip from './Chip';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModalNotificationTimesProps {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
}

function ModalNotificationTimes({ visible, setModalVisible }: ModalNotificationTimesProps) {
  const [notificationTimes, setNotificationTimes] = useState<number[]>(notificationStore.reminderHours);
  const maxHours = 5;
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const handleToggleTime = async (time: string) => {
    const hour = parseInt(time.split(':')[0]);

    if (notificationTimes.includes(hour)) {
      // Desseleccionar
      setNotificationTimes(notificationTimes.filter(h => h !== hour));
    } else {
      // Seleccionar
      if (notificationTimes.length >= maxHours) {
        Toast.show({
          type: 'error',
          text1: 'No puede seleccionar más de 5 horarios.',
          position: 'bottom'
        });
        return;
      }
      setNotificationTimes([...notificationTimes, hour]);
      notificationStore.setReminderHours([...notificationTimes, hour]);

      await AsyncStorage.setItem("reminderHours", JSON.stringify([...notificationTimes, hour]));

    }
  };


  return (
    <BaseModal visible={visible} onClose={() => setModalVisible(false)}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <FontAwesome6 name="clock" size={20} color="#1e1e1e" iconStyle="regular" />
          <Text style={{ fontSize: 20, fontWeight: '600', color: '#1e1e1e' }}>
            Horas para recordar
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 16, color: '#1e1e1e' }}>
        Puedes escoger hasta 5 horarios diferentes.
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBlock: 40, width: '80%', justifyContent: 'center' }}>
        {hours.map((hour, index) => {
          const label = `${hour.toString().padStart(2, '0')}:00`;
          const isSelected = notificationTimes.includes(hour);

          return (
            <Chip
              key={index}
              chipTitle={label}
              selected={isSelected}
              onToggle={handleToggleTime}
            />
          );
        })}
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
          onPress={() => setModalVisible(!visible)}
        >
          <FontAwesome6 name="arrow-left" size={15} color="#fff" iconStyle='solid' />
        </TouchableOpacity>

      </View>
    </BaseModal>
  );
}


export default ModalNotificationTimes