import { observer } from "mobx-react-lite";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { habitStore } from "../stores/HabitStore";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { habitsStatsStore } from "../stores/HabitsStatsStore";
import { useEffect, useState } from "react";
import ProgressBar from "../components/ProgressBar";

const ResumeScreen = observer(() => {

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 = domingo, 1 = lunes, ... 6 = sábado

  // Calculamos el domingo
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - ((dayOfWeek + 7) % 7));

  // Calculamos el sabado
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Formateo
  const formatDate = (date: Date) => date.toISOString().split('T')[0]; // "YYYY-MM-DD"

// const [porcentaje, setPorcentaje] = useState(0);

// useEffect(() => {
//   const fetchPorcentaje = async () => {
//     const result = await habitsStatsStore.frecuencyPorcent(habit.id || 0, formatDate(startDate), formatDate(endDate));
//                     setPorcentaje(result);
//   };
//                     fetchPorcentaje();
// }, [habit.id, startDate, endDate]);

  return (
    <>
      <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
        <View>
          <Text style={styles.title}>GENERAL</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
            <View style={[styles.card, { width: '48%' }]}>
              <Text style={{ fontSize: 22, fontWeight: 600 }}>{habitsStatsStore.totalHabits}</Text>
              <Text>Hábitos Acivos</Text>
            </View>
            <View style={[styles.card, { width: '48%' }]}>
              <Text style={{ fontSize: 22, fontWeight: 600 }}>{habitsStatsStore.totalHabitsPaused}</Text>
              <Text>Hábitos Pausados </Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
            <View style={[styles.card, { width: '48%' }]}>
              <Text style={{ fontSize: 22, fontWeight: 600 }}>-</Text>
              <Text>Días / 1 Hábito</Text>
            </View>
            <View style={[styles.card, { width: '48%' }]}>
              <Text style={{ fontSize: 22, fontWeight: 600 }}>-%</Text>
              <Text>Cumplimiento mensual</Text>
            </View>
          </View>

          {/* <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
            <View style={[styles.card, { display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }]}>
              <View style={{ backgroundColor: '#e4e4e4ff', width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome6 name='fire' size={20} iconStyle="solid" />
              </View>
              <View>
                <Text>Racha más larga histórica</Text>
                <Text style={{ fontSize: 20, color: '#1e1e1e', fontWeight: 600 }}>12 días seguidos</Text>
              </View>
            </View>
          </View> */}

          {/* <Text>Calendario con días completados (tipo heatmap)</Text> */}


          <View style={[styles.card, { display: 'flex', flexDirection: 'column', gap: 10, paddingBlock: 15 }]}>
            <Text style={{ fontWeight: 500 }}>Hábitos destacados</Text>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
              <View style={{ backgroundColor: '#e4e4e4ff', width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome6 name='bullseye' size={20} iconStyle="solid" />
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontSize: 12, color: '#929292ff' }}>Más constante</Text>
                <Text style={{ fontSize: 15 }}>{habitsStatsStore.mostConsistentHabit?.name}</Text>
              </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
              <View style={{ backgroundColor: '#e4e4e4ff', width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome6 name='clock' size={20} iconStyle="regular" />
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontSize: 12, color: '#929292ff' }}>Más reciente</Text>
                <Text style={{ fontSize: 15 }}>{habitsStatsStore.moreRecent?.name}</Text>
              </View>
            </View>

             <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
              <View style={{ backgroundColor: '#e4e4e4ff', width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome6 name='pause' size={20} iconStyle="solid" />
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                <Text style={{ fontSize: 12, color: '#929292ff' }}>Con más pausas</Text>
                <Text style={{ fontSize: 15 }}>Ejercicio 1 hora</Text>
              </View>
            </View> 

          </View>

          <View style={[styles.card, { display: 'flex', flexDirection: 'column', gap: 10, paddingBlock: 15 }]}>
            <Text style={{ fontWeight: 500 }}>Frecuencia semanal por hábito</Text>
            {habitStore.habits.map(habit => (
              habit.paused != true && (
                <ProgressBar key={habit.id} habit={habit}/>
              )
            ))}
          </View>
          {/* <Text style={styles.title}>MOVITACIÓN</Text>
          <Text>Frases motivadoras según el progreso</Text> */}

          {/* <Text style={styles.title}>LOGROS</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={[styles.card, { width: '48%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={{ backgroundColor: '#1e1e1e', width: 45, height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBlock: 15 }}>
                <FontAwesome6 name='font-awesome' size={25} color={'#f6f6f6'} />
              </View>
              <Text>7 Días seguidos</Text>
              <Text style={{ color: '#26c523ff', fontSize: 12 }}>Desbloqueado</Text>
            </View>
            <View style={[styles.card, { width: '48%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#c9c9c9ff' }]}>
              <View style={{ backgroundColor: '#b1b1b1ff', width: 45, height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBlock: 15 }}>
                <FontAwesome6 name='font-awesome' size={25} color={'#d4d4d4ff'} />
              </View>
              <Text style={{ color: '#a2a2a2ff' }}>30 días seguidos</Text>
              <Text style={{color:'#26c523ff', fontSize:12}}>Desbloqueado</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={[styles.card, { width: '48%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={{ backgroundColor: '#1e1e1e', width: 45, height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBlock: 15 }}>
                <FontAwesome6 name='font-awesome' size={25} color={'#f6f6f6'} />
              </View>
              <Text>10 habitos completados</Text>
              <Text style={{ color: '#26c523ff', fontSize: 12 }}>Desbloqueado</Text>
            </View>
            <View style={[styles.card, { width: '48%', justifyContent: 'center', alignItems: 'center' }]}>
              <View style={{ backgroundColor: '#1e1e1e', width: 45, height: 45, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBlock: 15 }}>
                <FontAwesome6 name='font-awesome' size={25} color={'#f6f6f6'} />
              </View>
              <Text>Racha de 10 días</Text>
              <Text style={{ color: '#26c523ff', fontSize: 12 }}>Desbloqueado</Text>
            </View>
          </View> */}
        </View>
      </ScrollView >
    </>
  );
});

export default ResumeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ededed'
  },
  card: {
    position: 'relative',
    width: '100%',
    backgroundColor: "#f6f6f6ff",
    padding: 16,
    paddingBlock: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cacacaff",
    marginBlock: 6,
    flexDirection: 'column',
    display: 'flex',
  },
  title: {
    fontSize: 15,
    fontWeight: 500
  },
});