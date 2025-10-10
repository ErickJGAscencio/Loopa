import { Habit } from "habit/domain/entities/Habit";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { habitStore } from "../stores/HabitStore";

interface HabitCardProps {
    habit: Habit,
    editable: boolean
    habitStore:()=>void;
}

export function HabitCard({ habit, editable }: HabitCardProps) {
    const [completed, setCompleted] = useState<boolean>(habit.completed);
    const [expanded, setExpanded] = useState<boolean>(false);

    const handleMarkHabit=()=>{
        habitStore.loadHabits();
    }

    return (
        <View style={[styles.container]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                    {editable &&
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
                    }
                    <Text style={{
                        color: '#666666ff',
                        fontSize: 18,
                        textDecorationLine: completed ? 'line-through' : 'none',
                    }}>
                        {habit.name}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 25,
                        height: 25,
                        backgroundColor: expanded ? '#e90000ff' : '#EDEDED',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={() => setExpanded(!expanded)}
                >
                    <Text>V</Text>
                </TouchableOpacity>
            </View>
            {expanded &&
                <View style={{ display: 'flex', gap: 10 }}>
                    <View style={{ height: 1, backgroundColor: '#9f9f9fff', width: '100%', marginVertical: 10 }} />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '48%', backgroundColor: '#e6e6e6ff', borderRadius: 10, paddingBlock: 5, paddingInline: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Text>O</Text>
                            <View>
                                <Text style={{ fontSize: 12, color: '#898989ff' }}>Total</Text>
                                <Text style={{ fontSize: 14, fontWeight: 600 }}>12 veces</Text>
                            </View>
                        </View>
                        <View style={{ width: '48%', backgroundColor: '#e6e6e6ff', borderRadius: 10, paddingBlock: 5, paddingInline: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <Text>O</Text>
                            <View>
                                <Text style={{ fontSize: 12, color: '#898989ff' }}>Útima Vez</Text>
                                <Text style={{ fontSize: 14, fontWeight: 600 }}>7 oct</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#E7D4CD', borderRadius: 10, paddingBlock: 5, paddingInline: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text>🔥</Text>
                        <View>
                            <Text style={{ fontSize: 12, color: '#898989ff' }}>Racha Actual</Text>
                            <Text style={{ fontSize: 14, fontWeight: 600, color: '#ED8936' }}>5 ías</Text>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#efefef",
        padding: 16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#9b9b9bff",
        paddingBlock: 10,
        marginBlock: 6,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: "space-between",
    },
    expanded: {
        padding: 16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#9b9b9bff",
        paddingBlock: 16,
        marginBlock: 6,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: "space-between",
        height: '100%',
    }
});