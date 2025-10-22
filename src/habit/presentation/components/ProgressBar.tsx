import { Habit } from 'habit/domain/entities/Habit';
import { Text, View } from 'react-native'
import { habitsStatsStore } from '../stores/HabitsStatsStore';
import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  habit: Habit;
}
function ProgressBar({ habit }: ProgressBarProps) {
  const [frecuencyPorcet, setFrecuencyPorcet] = useState(0);

  useEffect(() => {
    async function fetchPorcentaje() {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - ((dayOfWeek + 7) % 7));
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      const formatDate = (date: Date) => date.toISOString().split('T')[0];

      const result = await habitsStatsStore.frecuencyPorcent(
        habit.id || 0,
        formatDate(startDate),
        formatDate(endDate)
      );

      setFrecuencyPorcet(Math.max(0, Math.min(100, result || 0)));
    }

    fetchPorcentaje();
  }, [habit]);

  return (
    <View key={habit.id || 0} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>{habit.name}</Text>
        <Text>{Math.round(frecuencyPorcet)}%</Text>
      </View>
      <View style={{ backgroundColor: '#e7e7e7ed', width: '100%', height: 8, borderRadius: 10 }}>
        <View style={{ backgroundColor: '#1e1e1e', height: 8, borderRadius: 10, width: `${frecuencyPorcet}%` }} />
      </View>
    </View>
  );
}

export default ProgressBar;