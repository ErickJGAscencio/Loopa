import React, { useState } from 'react'
import { BaseModal } from './BaseModal';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { TimePicker } from './TimePicker';
import { notificationStore } from '../stores/NotificationStore';
import Chip from './Chip';

interface ModalNotificationTimesProps {
  visible: boolean;
  setModalVisible: (value: boolean) => void;
}

function ModalNotificationTimes({ visible, setModalVisible }: ModalNotificationTimesProps) {
  const [notificationTimes, setNotificationTimes] = useState<number[]>(notificationStore.reminderHours);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleAddTime = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (!notificationTimes.includes(hour)) {
      setNotificationTimes([...notificationTimes, hour]);
    }
    setShowPicker(false);
  };

  return (
    <BaseModal visible={visible} onClose={() => setModalVisible(false)}>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <FontAwesome6 name="clock" size={20} color="#1e1e1e" iconStyle="regular" />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' }}>
              Horas para recordar
            </Text>
          </View>
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <FontAwesome6 name="plus" size={20} color="#1e1e1e" iconStyle="solid" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, width: '100%' }}>
          {notificationTimes.map((time, index) => (
            <Chip
              key={index}
              chipTitle={`${time.toString().padStart(2, '0')}:00`}
              onRemove={() => {
                setNotificationTimes(notificationTimes.filter((t) => t !== time));
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 50 }}>
        <TouchableOpacity
          // style={styles.modalButton}
          onPress={() => setModalVisible(false)}
        >
          <FontAwesome6 name="arrow-left" size={15} color="#fff" iconStyle="solid" />
        </TouchableOpacity>

        <TouchableOpacity
          // style={styles.modalButton}
          onPress={() => {
            notificationStore.setReminderHours(notificationTimes);
            setModalVisible(false);
          }}
        >
          <FontAwesome6 name="check" size={15} color="#fff" iconStyle="solid" />
        </TouchableOpacity>
      </View>

      {/* Picker en su propio modal */}
      <BaseModal visible={showPicker} onClose={() => setShowPicker(false)}>
        <TimePicker
          visible={showPicker}
          setShowPicker={setShowPicker}
          onSelectTime={handleAddTime}
        />
      </BaseModal>

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