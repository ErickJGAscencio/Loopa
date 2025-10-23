import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const RemindersScreen = observer(() => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          width: '30%',
          height: 35,
          justifyContent: 'center',
          backgroundColor: '#1e1e1e',
          alignItems: 'center',
          borderRadius: 50,
          display: 'flex',
          flexDirection: 'row',
          gap: 10
        }}
        onPress={() => { }}
      >
        <Text style={{ color: '#fff', fontSize: 15, fontWeight: 500 }}>Añadir</Text>
        <FontAwesome6 name="plus" size={15} color="#fff" iconStyle='solid' />
      </TouchableOpacity>

      
      <Text>En construcción...</Text>
    </SafeAreaView>
  );
});


export default RemindersScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ededed',
  }
})