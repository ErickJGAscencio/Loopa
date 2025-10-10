//Maneja el estado observable (MobX en este caso). Aquí se conectan los usecases con la UI.

import { Habit } from "habit/domain/entities/Habit";
import { HabitRepositoryImpl } from '../../infrastructure/repositories/HabitRepositoryImpl';
import { CreateHabit } from "../../application/usecases/createHabit";
import { GetHabits } from '../../application/usecases/getHabits';
import { makeAutoObservable } from "mobx";

const habitRepositoryImpl = new HabitRepositoryImpl();

class HabitStore {
    habits: Habit[] = [];

    constructor() {
        makeAutoObservable(this);
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

    async loadHabits() {
        const usecase = new GetHabits(habitRepositoryImpl);
        this.habits = await usecase.execute();
    }

    async createHabit(habit: Habit) {
        const usecase = new CreateHabit(habitRepositoryImpl);
        await usecase.execute(habit);
        await this.loadHabits();
    }

}

export const habitStore = new HabitStore();
