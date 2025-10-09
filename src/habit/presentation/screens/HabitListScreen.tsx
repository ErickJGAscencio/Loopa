import { habitStore } from '../../presentation/stores/HabitStore';
import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Button, TextInput } from 'react-native';
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
    const [viewOption, setViewOption] = useState<boolean>(false);

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
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                        <Text style={{ color: '#EFEFEF', fontSize: 35, fontWeight: 600 }}>{habitStore.completedPorcent}%</Text>
                        <Text style={{ color: '#EFEFEF', fontSize: 10, textAlign: 'right' }}>COMPLETADO</Text>
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

            <View style={{ backgroundColor: '#cdcdcded', width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'row', gap: 10, padding: 10, justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: '48%', backgroundColor: '#cdcdcded', padding: 10, borderRadius: 10, alignContent: 'center', justifyContent: 'center' }} onPress={() => setViewOption(true)}>
                    <Text style={{ color: 'rgba(150, 150, 150, 1)ed', fontSize: 16, textAlign: 'center' }}>Lista</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '48%', backgroundColor: '#efefef', padding: 10, borderRadius: 10, alignContent: 'center', justifyContent: 'center' }} onPress={() => setViewOption(false)}>
                    <Text style={{ color: '#1e1e1e', fontSize: 16, textAlign: 'center' }}>Calendario</Text>
                </TouchableOpacity>
            </View>

            {viewOption ? (
                <>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={{ color: '#1e1e1e', fontSize: 20, fontWeight: 400 }}>
                            {today.toLocaleString("es-MX", { month: "long", day: "numeric" })}
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 50,
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
                            <HabitCard key={habit.id} habit={habit} />
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
