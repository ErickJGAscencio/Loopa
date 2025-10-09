import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { BaseModal } from "./BaseModal";

interface TimePickerProps {
    visible: boolean;
    setShowPicker: (value: boolean) => void;
    onSelectTime: (value: string) => void;
}

interface PickerTimeForm {
    hour: string;
    minutes?: string;
    meridian: boolean // 0/false = am | 1/true = pm
}

export function TimePicker({ visible, setShowPicker, onSelectTime }: TimePickerProps) {
    const [form, setForm] = useState<PickerTimeForm>({
        hour: '8',
        minutes: '0',
        meridian: false
    });

    const formatHour = (value: string): string => {
        const numeric = value.replace(/[^0-9]/g, '');
        let hour = parseInt(numeric);

        if (isNaN(hour)) return '1';
        if (hour > 12) hour = hour % 10 || 12;
        if (hour === 0) hour = 12;

        return hour.toString();
    };

    const handleCreateTime = () => {
        const correctedHour = formatHour(form.hour);
        const hour = parseInt(correctedHour);
        const minutes = form.minutes?.padStart(2, '0') ?? '00';

        let finalHour = form.meridian
            ? hour === 12 ? 12 : hour + 12
            : hour === 12 ? 0 : hour;

        const formatted = `${finalHour.toString().padStart(2, '0')}:${minutes}`;
        console.log(`Hora seleccionada: ${formatted}`);
        onSelectTime(formatted);

        setShowPicker(!visible);
    };

    return (
        <>{visible &&
            <BaseModal visible={visible} onClose={() => setShowPicker(!visible)}>
                <View style={{ gap: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e1e1e' }}>
                        Seleccione Hora
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>

                        <View style={{ alignItems: 'center', width: '30%', justifyContent: 'center', alignContent: 'center' }}>
                            <TextInput
                                style={{ padding: 10, borderBottomWidth: 0.5, fontSize: 40, width: '100%', textAlign: 'center' }}
                                defaultValue="8"
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={value => setForm(prev => ({ ...prev, hour: value }))}
                            />
                            <Text style={{ fontSize: 16 }}>Hora</Text>
                        </View>
                        <Text>:</Text>
                        <View style={{ alignItems: 'center', width: '30%', justifyContent: 'center', alignContent: 'center' }}>
                            <TextInput
                                style={{ padding: 10, borderBottomWidth: 0.5, fontSize: 40, width: '100%', textAlign: 'center' }}
                                defaultValue="00"
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={value => setForm(prev => ({ ...prev, minutes: value }))}
                            />
                            <Text style={{ fontSize: 16 }}>Minuto</Text>
                        </View>
                        <View>
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <TouchableOpacity
                                    style={[styles.meridianButton, form.meridian ? "" : styles.meridianSelected, { borderStartStartRadius: 10, borderTopEndRadius: 10 }]}
                                    onPress={() => setForm(prev => ({ ...prev, meridian: false }))}
                                >
                                    <Text style={[{ fontSize: 20, }, form.meridian ? { color: '#111l' } : { color: '#fff' },]}>AM</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.meridianButton, form.meridian ? styles.meridianSelected : "", { borderEndEndRadius: 10, borderBottomStartRadius: 10 }]}
                                    onPress={() => setForm(prev => ({ ...prev, meridian: true }))}
                                >
                                    <Text style={[{ fontSize: 20, }, form.meridian ? { color: '#fff' } : { color: '#111' },]}>PM</Text>
                                </TouchableOpacity>
                            </View>
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
                        onPress={() => setShowPicker(!visible)}
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
                        onPress={() => handleCreateTime()}
                    >
                        <Text style={{ color: '#EFEFEF', fontSize: 18 }}>V</Text>
                    </TouchableOpacity>
                </View>
            </BaseModal>
        }
        </>
    )
}

const styles = StyleSheet.create({
    meridianSelected: {
        backgroundColor: '#1e1e1e'
    },
    meridianButton: {
        borderWidth: 0.5,
        padding: 8,
    },
})