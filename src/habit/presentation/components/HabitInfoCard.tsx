import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { Habit } from 'habit/domain/entities/Habit'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { habitStore } from '../stores/HabitStore';
import Toast from 'react-native-toast-message';

interface HabitInfoCardProps {
    habit: Habit,
    setModalVisible: (value: boolean) => void;
    setCurrentHabit: (value:Habit) => void;
}

export function HabitInfoCard({ habit, setModalVisible, setCurrentHabit }: HabitInfoCardProps) {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    // setCurrentHabit(habit);

    const handlePauseHabit = () => {
        habitStore.markPaused(habit.id || 0, !habit.paused)
        Toast.show({
            type: 'success',
            text1: `${habit.name}`,
            text2: `Ha sido ${habit.paused ? "activado" : "pausado"}`,
            position: 'bottom',
        });
    }


    return (
        <>
            <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
                <View style={styles.card}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, gap:10 }}>
                        <Text style={{ fontSize: 19, fontWeight: 500, width:'68%'}}>{habit.name}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 5,
                                alignItems: 'center',
                                backgroundColor: habit.paused ? "#e4e4e4ff" : "#c4f0c7ff",
                                padding: 1,
                                paddingInline: 5,
                                borderRadius: 10,
                                borderWidth: 0.5,
                                borderColor: habit.paused ? "#838383ff" : '#2d6616ff'
                            }}>
                                <FontAwesome6 name={habit.paused ? "circle-pause" : 'circle-play'} color={habit.paused ? "#838383ff" : '#2d6616ff'} />
                                <Text style={{ color: habit.paused ? "#838383ff" : '#2d6616ff' }}>{habit.paused ? "pausado" : "activo"}</Text>
                            </View>

                            <TouchableOpacity style={{ width: 25, height: 'auto', padding: 3 }} onPress={() => setShowMenu(!showMenu)}>
                                <FontAwesome6 name='ellipsis-vertical' size={18} iconStyle='solid' style={{ textAlign: 'center' }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={styles.block}>
                            <Text style={styles.titleBlock}>Racha</Text>
                            <Text style={styles.metric}>{habit.current_streak}</Text>
                            <Text style={{ fontSize: 12 }}>días seguidos</Text>
                        </View>
                        <View style={styles.block}>
                            <Text style={styles.titleBlock}>Total</Text>
                            <Text style={styles.metric}>{habit.total_completed}</Text>
                            <Text style={{ fontSize: 12 }}>realizadas</Text>
                        </View>
                        <View style={styles.block}>
                            <Text style={styles.titleBlock}>Última vez</Text>
                            <Text>{new Date(habit.updated_at).toLocaleDateString("es-MX", { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#9f9f9fff', width: '100%', marginVertical: 10 }} />
                    <Text style={{ fontSize: 12 }}>Creado el {new Date(habit.created_at).toLocaleDateString('es-MX', { day: "numeric", month: 'short', year: 'numeric' })}</Text>
                    {/* {new Date(habit.updated_at).toLocaleDateString('es-MX', {day:"numeric", month:'short'})} */}


                    {showMenu && (

                        <View style={{
                            position: 'absolute',
                            top: 40,
                            right: 30,
                            backgroundColor: '#f6f6f6ff',
                            padding: 8,
                            borderRadius: 8,
                            borderWidth: 0.5,
                            borderColor: "#cacacaff",
                            zIndex: 10,
                            elevation: 4,
                            width: '40%',
                        }}>
                            <TouchableOpacity style={styles.item} onPress={() => { handlePauseHabit(), setShowMenu(!showMenu) }} >
                                <View style={{
                                    width: 25,
                                    alignItems: 'center',
                                }}>
                                    {habit.paused ?
                                        <FontAwesome6 name="play" size={15} color="#1e1e1e" iconStyle="solid" />
                                        :
                                        <FontAwesome6 name="pause" size={15} color="#1e1e1e" iconStyle="solid" />
                                    }
                                </View>
                                <Text style={[styles.itemText]}> {habit.paused ? "Activar" : "Pausar"}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.item} onPress={() => { setCurrentHabit(habit); setModalVisible(true) }}>
                                <View style={{
                                    width: 25,
                                    alignItems: 'center',
                                }}>
                                    <FontAwesome6 name="trash" size={15} color="#d21313ff" iconStyle="solid" />
                                </View>
                                <Text style={[styles.itemText, { color: '#d21313ff' }]}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        width: '100%',
        backgroundColor: "#f6f6f6ff",
        padding: 16,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(195, 195, 195, 1)",
        paddingBlock: 20,
        marginBlock: 6,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: "space-between",
    },
    block: {
        padding: 5,
        backgroundColor: '#ecececff',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e3e3e3ff",
        width: '30%'
    },
    titleBlock: {
        fontSize: 12
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 6,
    },
    itemText: {
    },
    metric: {
        fontSize: 20,
        fontWeight: 500,
        paddingInline: 3
    }
});