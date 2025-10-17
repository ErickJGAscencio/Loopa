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

    get habitsCompleted(): Habit[] {// Cantidad total de habitos completados

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

        const effectiveStart = createdAt > start ? createdAt : start;
        const totalDays = Math.ceil((end.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

        const doneDays = logsInRange.length;
        console.log(totalDays === 0 ? 0 : Math.round((doneDays / totalDays) * 100));

        return totalDays === 0 ? 0 : Math.round((doneDays / totalDays) * 100);
    }

}

export const habitsStatsStore = new HabitsStatsStore();