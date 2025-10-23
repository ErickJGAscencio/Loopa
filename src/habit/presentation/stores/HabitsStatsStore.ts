import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../../domain/entities/Habit";
import { habitLogStore } from "./HabitLogStore";
import { habitStore } from "./HabitStore";

class HabitsStatsStore {

    get totalHabits(): number {// Cantidad total de habitos activos
        return habitStore.habits.filter(habit => !habit.paused).length;
    }

    get totalHabitsPaused(): number {// Cantidad total de habitos pausados
        return habitStore.habits.filter(habit => habit.paused).length;
    }

    get totalHabitsCompleted(): number {// Cantidad total de habitos completados
        return habitStore.habits.filter(habit => habit.completed).length;
    }

    get activeHabits(): Habit[] {// Lista de habitos activos y no completados

        return habitStore.habits.filter(habit => !habit.paused && !habit.completed);
    }

    get habitsCompleted(): Habit[] {// Lista de habitos completados
        return habitStore.habits.filter(habit => habit.completed);
    }

    get completedPorcent(): number {// Porcentaje de hábitos completados qu están activos
        const total = habitStore.habits.filter(habit => !habit.paused).length;
        const done = habitStore.habits.filter(habit => habit.completed && !habit.paused).length;
        return total === 0 ? 0 : Math.round((done / total) * 100);
    }

    get moreRecent(): Habit | null {
        if (habitStore.habits.length === 0) return null;

        const sorted = habitStore.habits
            .filter(h => h.created_at)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        return sorted[0] ?? null;
    }

    get mostConsistentHabit(): Habit | null {
        if (habitStore.habits.length === 0) return null;

        const sorted = habitStore.habits
            .filter(h => h.current_streak)
            .sort((a, b) => b.current_streak - a.current_streak);

        return sorted[0] ?? null;
    }

    async frecuencyPorcent(id: number, startDate: string, endDate: string): Promise<number> {
        const habit = habitStore.habits.find(h => h.id === id && !h.paused);
        if (!habit) return 0;

        // Filtramos logs por hábito y rango de fechas
        const logsInRange = habitLogStore.logs.filter(log => {
            return (
                log.habit_id === id &&
                log.completed &&
                log.date >= startDate &&
                log.date <= endDate
            );
        });

        // console.log(logsInRange);
        // Calculamos días posibles (desde creación hasta endDate, limitado por rango)
        const createdAt = new Date(habit.created_at);
        const start = new Date(startDate);
        const end = new Date(endDate);

        // const effectiveStart = createdAt > start ? createdAt : start;
        const effectiveStart = createdAt > start ? start : start;
        const totalDays = Math.ceil((end.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;//Con estas dos lineas evitamos que si el hbt fue creado un jueves, 
                                                                                                            // se mantenga una relacion respecto a los dias faltantes d ela semana 
                                                                                                            // y se pueda llegar al 100% sin necesidad de los dias previos al jueves

        const doneDays = logsInRange.length;
        // console.log(totalDays === 0 ? 0 : Math.round((doneDays / totalDays) * 100));

        return totalDays === 0 ? 0 : Math.round((doneDays / totalDays) * 100);
    }

    async updateStreak(habit: Habit) {
        console.log("Fecha registrada:", habit.updated_at); // Ej: 2025-10-18T16:28:02.820Z

        const today = new Date();
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const lastDate = habit.updated_at ? new Date(habit.updated_at) : null;
        const currentStreak = habit.current_streak ?? 0;

        let newStreak = 1;

        if (lastDate) {
            const lastDateNormalized = new Date(
                lastDate.getFullYear(),
                lastDate.getMonth(),
                lastDate.getDate()
            );

            const isSameDay =
                todayDate.getFullYear() === lastDateNormalized.getFullYear() &&
                todayDate.getMonth() === lastDateNormalized.getMonth() &&
                todayDate.getDate() === lastDateNormalized.getDate();

            const yesterday = new Date(todayDate);
            yesterday.setDate(todayDate.getDate() - 1);

            const isYesterday =
                yesterday.getFullYear() === lastDateNormalized.getFullYear() &&
                yesterday.getMonth() === lastDateNormalized.getMonth() &&
                yesterday.getDate() === lastDateNormalized.getDate();

            if (isSameDay) {
                console.log("Ya se registró hoy");
                return currentStreak;
            } else if (isYesterday) {
                console.log("Día siguiente");
                newStreak = currentStreak + 1;
            } else {
                console.log("Se rompió la racha");
                newStreak = 1;
            }
        }

        console.log("Racha actualizada:", newStreak);
        return newStreak;
    }
}

export const habitsStatsStore = new HabitsStatsStore();