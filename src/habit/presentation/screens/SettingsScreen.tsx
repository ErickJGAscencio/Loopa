import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import SwitchItem from '../components/SwitchItem';
import { notificationStore } from '../stores/NotificationStore';
import ModalNotificationTimes from '../components/ModalNotificationTimes';

const SettingsScreen = observer(() => {
  // Estados simulados (reemplazar con settingsStore)
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      {/* PREFERENCIAS DE USUARIO */}
      <Text style={styles.sectionTitle}>PREFERENCIAS DE USUARIO</Text>

      <SwitchItem
        label="Activar Notificaciones"
        value={notificationStore.enabled}
        onToggle={notificationStore.toggle}
      />
      <SwitchItem
        label="Recordatorios sutiles"
        value={remindersEnabled}
        onToggle={setRemindersEnabled}
      />

      <ButtonItem label="Horario de notificaciones" onPress={() => (setModalVisible(!modalVisible))} />

      {/* SEGURIDAD Y PRIVACIDAD */}
      <Text style={styles.sectionTitle}>SEGURIDAD Y PRIVACIDAD</Text>
      <ButtonItem label="Exportar Datos" onPress={() => console.log('Exportar')} />
      <ButtonItem label="Borrar Historial de Datos" onPress={() => console.log('Borrar')} />

      {/* INFORMACIÓN APP */}
      <Text style={styles.sectionTitle}>INFORMACIÓN APP</Text>
      <InfoItem label="Versión app" value="1.0.0" />
      <LinkItem label="Política y privacidad" url="https://politica.com" />

      {/* CONFIGURACIÓN AVANZADA */}
      <Text style={styles.sectionTitle}>CONFIGURACIÓN AVANZADA</Text>
      <SwitchItem
        label="Sincronización con la nube"
        value={cloudSyncEnabled}
        onToggle={setCloudSyncEnabled}
      />
      
      <ModalNotificationTimes visible={modalVisible} setModalVisible={setModalVisible} />

    </ScrollView>
  );
});

export default SettingsScreen;

const ButtonItem = ({ label, onPress }: { label: string; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonItem}>
    <Text style={styles.buttonText}>{label}</Text>
  </TouchableOpacity>
);

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.itemRow}>
    <Text style={styles.itemLabel}>{label}</Text>
    <Text style={styles.itemValue}>{value}</Text>
  </View>
);

const LinkItem = ({ label, url }: { label: string; url: string }) => (
  <TouchableOpacity onPress={() => console.log(`Abrir ${url}`)} style={styles.buttonItem}>
    <Text style={styles.linkText}>{label}</Text>
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ededed',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#1e1e1e',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemLabel: {
    color: '#1e1e1e',
    fontSize: 14,
  },
  itemValue: {
    color: '#1e1e1e',
    fontSize: 14,
  },
  pickerContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#959595ff',
    marginLeft: 8,
  },
  pickerSelected: {
    backgroundColor: '#3a3a3a',
  },
  pickerText: {
    color: '#fff',
    fontSize: 13,
  },
  buttonItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  buttonText: {
    color: '#1e1e1e',
    fontSize: 16,
  },
  linkText: {
    color: '#4da6ff',
    fontSize: 14,
  },
});
