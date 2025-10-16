import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BaseModal } from "./BaseModal";
import { habitStore } from "../stores/HabitStore";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import Toast from 'react-native-toast-message';

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
        if (form.name == null || form.name == "") {
            Toast.show({
                type: 'info',
                text1: 'Nombre vacío.',
                text2: 'Necesitas un nombre para el HÁBITO.',
                position: 'bottom',
            });
            return;
        }

        const habit = {
            name: form.name,
            description: form.description,
            days: { "Mon": "08:00" },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            completed: false,
            paused: false,
            current_streak: 0,
            total_completed: 0,
        };

        habitStore.createHabit(habit);
    };

    return (
        <BaseModal visible={modalVisible} onClose={() => setModalVisible(!modalVisible)}>
            <View style={{ gap: 16 }}>
                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <FontAwesome6 name="bookmark" size={20} color="#1e1e1e" iconStyle='solid' />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' }}>
                        Nuevo Hábito
                    </Text>
                </View>
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
                        color: '#1e1e1e'
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
                        color: '#1e1e1e'
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
                    <FontAwesome6 name="arrow-left" size={15} color="#fff" iconStyle='solid' />

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
                    <FontAwesome6 name="check" size={15} color="#fff" iconStyle='solid' />
                </TouchableOpacity>
            </View>

        </BaseModal>
    )
}