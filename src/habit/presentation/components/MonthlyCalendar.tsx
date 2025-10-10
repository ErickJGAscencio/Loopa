import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { habitStore } from "../stores/HabitStore";
import { HabitCard } from "./HabitCard";

export function MonthlyCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0 = Sunday
  const [daySelected, setDaySelected] = useState<number | null>(today.getDate());

  console.log(daySelected);
  // Generar array de días con padding inicial
  const daysArray = [];
  for (let i = 0; i < startWeekday; i++) {
    daysArray.push(null); // espacio vacío
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  useEffect(() => {
    const fetchHabits = async () => {
      await habitStore.loadHabits();
      console.log("HÁBITOS EN UI:", habitStore.habits);
    };
    fetchHabits();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity>
            <Text>
              {`<`}
            </Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {today.toLocaleString("es-MX", { month: "long", year: "numeric" }).toUpperCase()}
          </Text>
          <TouchableOpacity>
            <Text>
              {`>`}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
            <Text key={index} style={styles.weekday}>
              {day}
            </Text>
          ))}
          {daysArray.map((day, index) => {
  const isToday = day === today.getDate();
  const isSelected = day === daySelected;

  return (
    <View key={index} style={styles.dayBox}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => setDaySelected(day)}
        style={[
          styles.dayContainer,
          isSelected && styles.daySelected,
          isToday && styles.todayContainer,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            isToday && styles.todayText,
            isSelected && styles.selectedText,
          ]}
        >
          {day ?? ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
})}

        </View>
      </View>

      <View style={{ backgroundColor: '#e4e4e4ff', borderRadius: 15, padding: 20, width: '100%', marginTop: 20 }}>
        <Text style={{ fontWeight: 600, fontSize: 15 }}>Hábitos completados - {today.toLocaleString("es-MX", { day: "numeric", month: '2-digit', year: 'numeric' })}</Text>

        <View>
          {habitStore.habitsCompleted.map(habit => (
            <HabitCard key={habit.id} habit={habit} editable={false} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    padding: 16,
    borderRadius: 15,
    borderColor: "#ededed",
    elevation: 2,
  },

  title: {
    color: "#1e1e1e",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 'auto'
  },
  weekday: {
    width: "14.28%",
    textAlign: "center",
    color: "#aaa",
    fontWeight: "bold",
    marginBottom: 8,
  },
  dayBox: {
    width: "14.2%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },  
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#efefef',
    width: 40,
    height: 50,
  },
  daySelected: {
    borderColor: '#1e1e1e',
    borderWidth: 2,
  },
  todayContainer: {
    backgroundColor: '#1e1e1e',
  },
  dayText: {
    color: '#1e1e1e',
    fontSize: 18,
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedText: {
    fontWeight: 'bold',
  },
});

