import React, { useState } from "react";
import { View, Text, TextInput,  TouchableOpacity } from 'react-native';
import { BaseModal } from "./BaseModal";
import { habitStore } from "../stores/HabitStore";

interface NewHabitModalProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
}

interface HabitForm {
    name: string;
    description?: string;
    days?: string[];
}

export function NewHabitModal({ modalVisible, setModalVisible }: NewHabitModalProps) {
    const [form, setForm] = useState<HabitForm>({
        name: "",
        description: "",
        days: [],
    });

    const handleCreateHabit = () => {
        const habit = {
            name: form.name,
            description: form.description,
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
                        color:'#1e1e1e'
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
                        color:'#1e1e1e'
                    }}
                    placeholderTextColor={'#a3a3a3ff'}
                    onChangeText={value => setForm(prev => ({ ...prev, description: value }))}
                />

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

        </BaseModal>
    )
}