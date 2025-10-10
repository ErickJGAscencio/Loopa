import { habitStore } from '../../presentation/stores/HabitStore';
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Button, TextInput, StyleSheet } from 'react-native';
import { HabitCard } from "../components/HabitCard";
import { observer } from "mobx-react-lite";
import { MonthlyCalendar } from '../components/MonthlyCalendar';
import LinearGradient from 'react-native-linear-gradient';
import { NewHabitModal } from '../components/NewHabitModal';
import { useNavigation } from '@react-navigation/native';

const HabitListScreen = observer(() => {
    //   const { habits, loadHabits, createHabit } = habitStore;
    const today = new Date();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const navigation = useNavigation();
    const [sectionActive, setSectionActive] = useState<boolean>(true);

    useEffect(() => {
        const fetchHabits = async () => {
            await habitStore.loadHabits();
            console.log("HÁBITOS EN UI:", habitStore.habits);
        };
        fetchHabits();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                // <TouchableOpacity
                //     style={{
                //         width: 50,
                //         height: 35,
                //         justifyContent: 'center',
                //         backgroundColor: '#1e1e1e',
                //         alignItems: 'center',
                //         borderRadius: 50,
                //     }}
                //     onPress={() => setModalVisible(true)}
                // >
                //     <Text style={{ color: '#EFEFEF' }}>Noti</Text>
                // </TouchableOpacity>
                <Text>Noti</Text>
            ),
        });
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#ededed', gap: 20 }}>
            <LinearGradient
                colors={['#1e1e1e', '#D0D0D0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ width: '100%', backgroundColor: '#1e1e1e', padding: 15, borderRadius: 15 }}
            >
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', flexDirection: 'row'}}>
                        <Text style={{ color: '#EFEFEF', fontSize: 35, fontWeight: 600 }}>{habitStore.completedPorcent}%</Text>
                        <Text style={{ color: '#EFEFEF', fontSize: 10}}>COMPLETADO</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ color: '#EFEFEF', fontSize: 20, fontWeight: 600, textAlign: 'right' }}>{habitStore.totalHabitsCompleted}/{habitStore.totalHabits}</Text>
                        <Text style={{ color: '#EFEFEF', fontSize: 10, textAlign: 'right' }}>HÁBITOS</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#e7e7e7ed', width: '100%', height: 10, borderRadius: 10 }}>
                    <View style={{ backgroundColor: '#1e1e1e', height: 10, borderRadius: 10, width: `${habitStore.completedPorcent}%` }} />
                </View>
            </LinearGradient>

            <View style={{
                backgroundColor: '#e4e4e4ff',
                width: '100%',
                borderRadius: 10,
                flexDirection: 'row',
                gap: 10,
                padding: 10,
                justifyContent: 'space-between'
            }}>
                <TouchableOpacity
                    style={[styles.button, sectionActive ? styles.sectionActive : styles.sectionDesactive]}
                    onPress={() => setSectionActive(true)}
                >
                    <Text style={[styles.sectionText, sectionActive ? styles.activeText : styles.inactiveText]}>
                        Hábitos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, sectionActive ? styles.sectionDesactive : styles.sectionActive]}
                    onPress={() => setSectionActive(false)}
                >
                    <Text style={[styles.sectionText, sectionActive ? styles.inactiveText : styles.activeText]}>
                        Calendario
                    </Text>
                </TouchableOpacity>
            </View>


            {sectionActive ? (
                <>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={{ color: '#1e1e1e', fontSize: 20, fontWeight: 400 }}>
                            {today.toLocaleString("es-MX", { month: "long", day: "numeric" })}
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 35,
                                height: 35,
                                justifyContent: 'center',
                                backgroundColor: '#1e1e1e',
                                alignItems: 'center',
                                borderRadius: 50,
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{ color: '#EFEFEF' }}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ width: '100%' }}>
                        {habitStore.habits.map(habit => (
                            <HabitCard key={habit.id} habit={habit} editable={true}/>
                        ))}
                    </ScrollView>
                </>
            ) : (
                <MonthlyCalendar />
            )}




            <NewHabitModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

        </View>
    );
});

export default HabitListScreen;

const styles = StyleSheet.create({
    button:{
        width:'45%',
        borderRadius: 8,
    },
    sectionActive: {
        backgroundColor: '#EFEFEF',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    sectionDesactive: {
        backgroundColor: '#e4e4e4ff',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    sectionText: {
        fontSize: 16,
        textAlign: 'center',
    },
    activeText: {
        color: '#1e1e1e',
        fontSize:15,
        fontWeight:500
    },
    inactiveText: {
        color: '#727272ff',
        fontSize:15,
        fontWeight:500
    },
});
