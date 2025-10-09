import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function MonthlyCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0 = Sunday

  // Generar array de días con padding inicial
  const daysArray = [];
  for (let i = 0; i < startWeekday; i++) {
    daysArray.push(null); // espacio vacío
  }
  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(i);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {today.toLocaleString("es-MX", { month: "long", year: "numeric" })}
      </Text>
      <View style={styles.grid}>
        {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
          <Text key={index} style={styles.weekday}>
            {day}
          </Text>
        ))}
        {daysArray.map((day, index) => (
          <View key={index} style={styles.dayBox}>
            <Text 
              style={[
                
                day === today.getDate() ? styles.todayText : styles.dayText

              ]}
              >
              {day ?? ""}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
  backgroundColor: "#efefef",
  padding: 16,
  height: "40%",
  borderRadius: 15,
  borderWidth: 0,
  borderColor: "#ededed",
  borderBottomWidth: 2,
  borderBottomColor: "rgba(166, 166, 166, 1)ded",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  // shadowRadius: 3,
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
  },
  weekday: {
    width: "14.28%",
    textAlign: "center",
    color: "#aaa",
    fontWeight: "bold",
    marginBottom: 8,
  },
  dayBox: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  dayText: {
    color: "#1e1e1e",
    fontSize: 18,
  },
  todayText: {
  color: "#ffffff",
  backgroundColor: "#1e1e1e",
  fontSize: 18,
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 50,
  overflow: "hidden",
},

});
