import { observer } from 'mobx-react-lite';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const RemindersScreen = observer(() => {
  return (
    <View style={styles.container}>
      <Text>En construcción...</Text>
    </View>
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