import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import SwitchItem from '../components/SwitchItem';
import { notificationStore } from '../stores/NotificationStore';

const SettingsScreen = observer(() => {
  // Estados simulados (puedes reemplazar con settingsStore)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [theme, setTheme] = useState('Oscuro');
  const [language, setLanguage] = useState('Español');
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);

  return (
    <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
      {/* PREFERENCIAS DE USUARIO */}
      <Text style={styles.sectionTitle}>PREFERENCIAS DE USUARIO</Text>
      
      <SwitchItem
        label="Activar Notificaciones"
        value={notificationsEnabled}
        onToggle={notificationStore.toggle}
      />
      <SwitchItem
        label="Recordatorios sutiles"
        value={remindersEnabled}
        onToggle={setRemindersEnabled}
      />


      {/* <PickerItem
        label="Tema"
        options={['Claro', 'Oscuro']}
        value={theme}
        onChange={setTheme}
      />
      <PickerItem
        label="Idioma"
        options={['Español', 'Inglés']}
        value={language}
        onChange={setLanguage}
      /> */}

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
    </ScrollView>
  );
});

export default SettingsScreen;


/** Subcomponentes institucionales **/

// const SwitchItem = ({ label, value, onToggle }: { label: string; value: boolean; onToggle: (v: boolean) => void }) => (
//   <View style={styles.itemRow}>
//     <Text style={styles.itemLabel}>{label}</Text>
//     <Switch value={value} onValueChange={onToggle} />
//   </View>
// );

const PickerItem = ({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <View style={styles.itemRow}>
    <Text style={styles.itemLabel}>{label}</Text>
    <View style={styles.pickerContainer}>
      {options.map(option => (
        <TouchableOpacity key={option} onPress={() => onChange(option)} style={[styles.pickerOption, value === option && styles.pickerSelected]}>
          <Text style={styles.pickerText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

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


/** Estilos institucionales **/

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
    fontSize: 14,
  },
  linkText: {
    color: '#4da6ff',
    fontSize: 14,
  },
});
