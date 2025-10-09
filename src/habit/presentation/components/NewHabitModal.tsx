import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseModal } from "./BaseModal";
import { habitStore } from "../stores/HabitStore";
import { TimePicker } from "./TimePicker";
import Chip from "./Chip";

interface NewHabitModalProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
}

interface HabitForm {
    name: string;
    description?: string;
    reminderTime?: string[]; //["08:00", "12:00"]
    days?: string[];
}

export function NewHabitModal({ modalVisible, setModalVisible }: NewHabitModalProps) {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [form, setForm] = useState<HabitForm>({
        name: "",
        description: "",
        reminderTime: [],
        days: [],
    });

    const handleCreateHabit = () => {
        const habit = {
            name: form.name,
            description: form.description,
            reminderTimes: ["08:00", "12:00"],
            days: { "Mon": "08:00" },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completed: false,
            paused: false
        };

        habitStore.createHabit(habit);
    };

    return (
        <BaseModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)}>
            <View style={{ gap: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' }}>
                    Nuevo Hábito
                </Text>

                <TextInput
                    placeholder="Nombre del hábito"
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 16,
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                    }}
                    placeholderTextColor={'#a3a3a3ff'}
                    onChangeText={value => setForm(prev => ({ ...prev, name: value }))}
                />
                <TextInput
                    placeholder="Descripción (opcional)"
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 8,
                        padding: 10,
                        fontSize: 16,
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                    }}
                    placeholderTextColor={'#a3a3a3ff'}
                    onChangeText={value => setForm(prev => ({ ...prev, description: value }))}
                />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
                    <Text style={{ fontSize: 16, color: '#1e1e1e' }}>Hora para recordarte</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={{
                                width: 30,
                                height: 30,
                                backgroundColor: '#1e1e1e',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15,
                            }}
                            onPress={() => setShowPicker(!showPicker)}
                        >
                            <Text style={{ color: '#EFEFEF', fontSize: 18 }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View>
                    {form.reminderTime &&

                        form.reminderTime.map((item, index) => (
                            <Chip key={index} chipTitle={item} onRemove={()=>("")}/>
                        ))
                    }
                </View>

                <View style={{ gap: 8 }}>
                    <Text style={{ fontSize: 16, color: '#1e1e1e' }}>Días</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: '#1e1e1e',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 15,
                                }}
                                onPress={() => handleCreateHabit()}
                            >
                                <Text style={{ color: '#EFEFEF' }}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', bottom: 0, marginTop: 50 }}>

                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 45,
                        backgroundColor: '#1e1e1e',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                    }}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={{ color: '#EFEFEF', fontSize: 18 }}>X</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 45,
                        backgroundColor: '#1e1e1e',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                    }}
                    onPress={() => { handleCreateHabit(), setModalVisible(!modalVisible) }}
                >
                    <Text style={{ color: '#EFEFEF', fontSize: 18 }}>V</Text>
                </TouchableOpacity>
            </View>

            <TimePicker visible={showPicker} setShowPicker={setShowPicker} onSelectTime={(value) => setForm(prev => ({
                ...prev,
                reminderTime: [...(prev.reminderTime ?? []), value]
            }))} />
        </BaseModal>
    )
}