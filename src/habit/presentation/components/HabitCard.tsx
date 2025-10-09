import { Habit } from "habit/domain/entities/Habit";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface HabitCardProps {
    habit: Habit,
}

export function HabitCard({ habit }: HabitCardProps) {
    const [completed, setCompleted] = useState<boolean>(habit.completed);
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    width: 25,
                    height: 25,
                    backgroundColor: completed ? '#1f1f1f' : '#EDEDED',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15, // mitad del ancho/alto
                    borderWidth: 1,
                    borderColor: '#bdbdbdff',
                }}
                onPress={() => setCompleted(!completed)}
            >
            </TouchableOpacity>
            <Text style={{
                color: '#666666ff',
                fontSize: 18,
                textDecorationLine: completed ? 'line-through' : 'none',
            }}>
                {habit.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#efefef",
        padding: 16,
        //   height: "35%",
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: "#ededed",
        borderBottomWidth: 2,
        borderBottomColor: "rgba(166, 166, 166, 1)ded",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        paddingBlock: 16,
        marginBlock: 6,
        flexDirection: 'row',
        display: 'flex',
        // justifyContent: 'space-between',
        gap: 10,
    },
});