import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import LinearGradient from "react-native-linear-gradient";
import { notificationStore } from "../stores/NotificationStore";

interface TimePickerProps {
  visible: boolean;
  setShowPicker: (value: boolean) => void;
  onSelectTime: (value: string) => void;
}

export function TimePicker({ visible, setShowPicker, onSelectTime }: TimePickerProps) {
  const [selectedHour, setSelectedHour] = useState<string>("08:00");
  const flatListRef = useRef<FlatList>(null);

  const hours = [
    "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00", "19:00", "20:00",
    "21:00", "22:00", "23:00", "00:00"
  ];

  const ITEM_HEIGHT = 50;
  const VISIBLE_ITEMS = 5;
  const CENTER_OFFSET = (ITEM_HEIGHT * VISIBLE_ITEMS) / 2 - ITEM_HEIGHT / 2;

  // 🔹 Al montar, mover el scroll a la hora seleccionada
  useEffect(() => {
    if (visible) {
      const index = hours.indexOf(selectedHour);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: index * ITEM_HEIGHT,
          animated: false,
        });
      }
    }
  }, [visible]);

  // 🔹 Detectar cuál hora está centrada
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const hour = hours[index];
    if (hour && hour !== selectedHour) {
      setSelectedHour(hour);
    }
  };

  const handleConfirm = () => {
    if (selectedHour) {
      console.log("Índice:", hours.indexOf(selectedHour));
      // onSelectTime(hours.indexOf(selectedHour));
      notificationStore.setReminderHours([
        ...notificationStore.reminderHours,
        hours.indexOf(selectedHour+1)
      ]);

      setShowPicker(false);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Efectos de fade */}
      <LinearGradient
        colors={["#fff", "rgba(255,255,255,0.4)"]}
        style={styles.fadeTop}
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.4)", "#fff"]}
        style={styles.fadeBottom}
      />

      {/* Lista de horas */}
      <FlatList
        ref={flatListRef}
        data={hours}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={{ height: ITEM_HEIGHT, justifyContent: "center" }}>
            <Text
              style={[
                styles.item,
                selectedHour === item && styles.selectedItem,
              ]}
            >
              {item}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={{ paddingVertical: CENTER_OFFSET }}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        onMomentumScrollEnd={handleScroll}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
      />

      {/* Botón de confirmación */}
      <TouchableOpacity style={styles.saveButton} onPress={handleConfirm}>
        <FontAwesome6 name="check" size={15} color="#fff" iconStyle="solid" />
      </TouchableOpacity>
    </View>
  );
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 5;

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS + 60,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  list: {
    width: "100%",
  },
  item: {
    textAlign: "center",
    fontSize: 26,
    color: "#333",
  },
  selectedItem: {
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: 10,
    marginHorizontal: 50,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginTop: 10,
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    height: 40,
    width: "100%",
    zIndex: 1,
  },
  fadeBottom: {
    position: "absolute",
    bottom: 45,
    height: 40,
    width: "100%",
    zIndex: 1,
  },
});
