import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../types';


import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';

interface SideBarMenuProps {
  setVisible: (value: boolean) => void;
  visible: boolean,
}

export function SideBarMenu({ setVisible, visible }: SideBarMenuProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [enable, setEnable] = useState<boolean>(false);
  const transXBack = useRef(new Animated.Value(0)).current;
  const fadeBack = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20; // solo si hay movimiento horizontal
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < -50) {
          // deslizó hacia a la izquierda
          setVisible(false);
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {

      setEnable(true);
      Animated.timing(fadeBack, {
        toValue: 1, // antes era 100
        duration: 180,
        useNativeDriver: false,
      }).start();

      Animated.timing(transXBack, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false,
      }).start();

    } else {
      Animated.parallel([
        Animated.timing(transXBack, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(fadeBack, {
          toValue: 0,
          duration: 180,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // desmontar solo cuando ambas animaciones terminen
        setEnable(false);
      });
    }
  }, [visible]);

  const transXInterpolated = transXBack.interpolate({
    inputRange: [0, 300],
    outputRange: ['-100%', '0%'],
  });

  if (!enable) return null; // evita que bloquee interacción y se renderice

  return (
    <Animated.View style={[styles.backSideBar, { opacity: fadeBack }]}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[styles.sideBar, {
        transform: [{ translateX: transXInterpolated }]
      }]}>

        <Text style={styles.title}>Menú</Text>

        <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('habits'), setEnable(!enable)}}>
          <FontAwesome6 name="bookmark" size={15} color="#1e1e1e" iconStyle='solid' />
          <Text style={styles.itemText}>Mis Hábitos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('calendar')}>
          <FontAwesome6 name="newspaper" size={15} color="#1e1e1e" iconStyle='solid' />
          <Text style={styles.itemText}>Resumen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('settings')}>
          <FontAwesome6 name="gear" size={15} color="#1e1e1e" iconStyle='solid' />
          <Text style={styles.itemText}>Ajustes</Text>
        </TouchableOpacity>

      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  backSideBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  sideBar: {
    flex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#EFEFEF',
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
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    paddingVertical: 12,
    borderBottomColor: '#1e1e1e',
    borderBottomWidth: 0.5,
  },
  itemText: {
    color: '#1e1e1e',
    fontSize: 16,
  },
});