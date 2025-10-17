import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { habitsStatsStore } from "../stores/HabitsStatsStore";


export function ProgressCard() {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: habitsStatsStore.completedPorcent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [habitsStatsStore.completedPorcent])

  const widthInterpolated = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={['#1e1e1e', '#D0D0D0']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: '100%', backgroundColor: '#1e1e1e', padding: 15, borderRadius: 15 }}
    >
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ color: '#EFEFEF', fontSize: 35, fontWeight: 600 }}>{habitsStatsStore.completedPorcent}%</Text>
          <Text style={{ color: '#EFEFEF', fontSize: 10 }}>COMPLETADO</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ color: '#EFEFEF', fontSize: 20, fontWeight: 600, textAlign: 'right' }}>{habitsStatsStore.totalHabitsCompleted}/{habitsStatsStore.totalHabits}</Text>
          <Text style={{ color: '#EFEFEF', fontSize: 10, textAlign: 'right' }}>HÁBITOS</Text>
        </View>
      </View>

      <View style={{ backgroundColor: '#e7e7e7ed', width: '100%', height: 10, borderRadius: 10 }}>
        <Animated.View style={{ backgroundColor: '#1e1e1e', height: 10, borderRadius: 10, width: widthInterpolated }} />
      </View>
    </LinearGradient>
  )
}