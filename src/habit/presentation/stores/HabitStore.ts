//Maneja el estado observable (MobX en este caso). Aquí se conectan los usecases con la UI.

import { Habit } from "habit/domain/entities/Habit";
import { HabitRepositoryImpl } from '../../infrastructure/repositories/HabitRepositoryImpl';
import { CreateHabit } from "../../application/usecases/createHabit";
import { GetHabits } from '../../application/usecases/getHabits';
import { action, makeAutoObservable } from "mobx";
import { MarkHabitDone } from "../../application/usecases/markHabitDone";
import { HabitLog } from "habit/domain/entities/HabitLog";
import { habitLogStore } from '../stores/HabitLogStore';

const habitRepositoryImpl = new HabitRepositoryImpl();

class HabitStore {
    habits: Habit[] = [];

    constructor() {
        makeAutoObservable(this, {
            setHabits: action,

        });
    }

    setHabits(habits: Habit[]) {
        this.habits = habits;
    }

    get totalHabits(): number {
        // console.log("Total Habitos: ", this.habits.length);
        return this.habits.length;
    }

    get totalHabitsCompleted(): number {
        // console.log("Total Habitos: ", this.habits.length);
        return this.habits.filter(habit => habit.completed).length;
    }

    get habitsCompleted(): Habit[] {
        // console.log("Total Habitos: ", this.habits.length);
        return this.habits.filter(habit => habit.completed);
    }

    get completedPorcent(): number {
        // console.log("Total Habitos: ", this.habits.length);
        const total = this.habits.length;
        const done = this.habits.filter(habit => habit.completed).length;
        return total === 0 ? 0 : Math.round((done / total) * 100);
    }

    get habitsByDay(): (date: string) => Habit[] {

        return (date: string) => {
            // console.log("📅 Fecha solicitada:", date);

            // console.log("📋 Logs en DB:", habitLogStore.logs);

            const logs = habitLogStore.logs.filter(log => {log.date === date && log.completed, console.log("Log Date: ",log.date)});
            // console.log("📋 Logs completados ese día:", logs);

            const completedIds = logs.map(log => log.habit_id);
            // console.log("✅ IDs de hábitos completados:", completedIds);

            const filteredHabits = this.habits.filter(habit =>
                habit.id != null &&
                completedIds.includes(habit.id) &&
                new Date(habit.createdAt) <= new Date(date)
            );
            // console.log("📦 Hábitos completados ese día:", filteredHabits);
            return filteredHabits;

        };
    }


    async loadHabits() {
        const usecase = new GetHabits(habitRepositoryImpl);
        const habits = await usecase.execute();
        this.setHabits(habits);
    }

    async createHabit(habit: Habit) {
        const usecase = new CreateHabit(habitRepositoryImpl);
        await usecase.execute(habit);
        await this.loadHabits();
    }

    async markHabitDone(id: number, status: boolean) {
        const usecase = new MarkHabitDone(habitRepositoryImpl);
        await usecase.execute(id, status);
        await this.loadHabits();
    }
}

export const habitStore = new HabitStore();
