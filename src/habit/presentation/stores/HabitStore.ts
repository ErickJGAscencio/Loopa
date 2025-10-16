//Maneja el estado observable (MobX en este caso). Aquí se conectan los usecases con la UI.

import { Habit } from "habit/domain/entities/Habit";
import { HabitRepositoryImpl } from '../../infrastructure/repositories/HabitRepositoryImpl';
import { CreateHabit } from "../../application/usecases/CreateHabit";
import { GetHabits } from '../../application/usecases/getHabits';
import { action, makeAutoObservable } from "mobx";
import { MarkHabitDone } from "../../application/usecases/markHabitDone";
import { habitLogStore } from '../stores/HabitLogStore';
import { MarkHabitPause } from "../../application/usecases/MarkHabitPaused";
import { DeleteHabit } from "../../application/usecases/DeleteHabit";

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
        return this.habits.filter(habit => !habit.paused).length;
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
        const total = this.habits.filter(habit => !habit.paused).length;
        const done = this.habits.filter(habit => habit.completed && !habit.paused).length;
        return total === 0 ? 0 : Math.round((done / total) * 100);
    }

    get habitsByDay(): (date: string) => Habit[] {

        return (date: string) => {
            // console.log(habitLogStore.logs);

            const logs = habitLogStore.logs.filter(log => {
                const logDate = log.date.split('T')[0]; //log.date.split('T')[0] Separamos la fecha 00/00/00 [T]00:00:00 y guardamos solo lo que hay en indice 0 (fecha)
                // console.log("Comparamos: ", logDate, " === ", date);
                return logDate === date && log.completed;
            });

            // console.log(logs);
            const completedIds = logs.map(log => log.habit_id); //Obtenemos los ids de los habitos completados
            // console.log(completedIds);

            const filteredHabits = this.habits.filter(habit =>
                habit.id != null &&
                completedIds.includes(habit.id) //Obtenemos el objeto del habito que se haye en la lista y corresponda a un id dentro del log
            );
            // console.log(filteredHabits);
            return filteredHabits;
        };
    }

    async loadHabits() {
        const usecase = new GetHabits(habitRepositoryImpl);
        const habits = await usecase.execute();
    // console.log("HÁBITOS DESDE STORE:", habits);

        this.setHabits(habits);
    }

    async createHabit(habit: Habit) {
        const usecase = new CreateHabit(habitRepositoryImpl);
        await usecase.execute(habit);
        await this.loadHabits();
    }

    async markHabitDone(id: number, status: boolean, total_completed:number, current_streak:number) {
        const usecase = new MarkHabitDone(habitRepositoryImpl);
        await usecase.execute(id, status, total_completed, current_streak);
        await this.loadHabits();
    }

    async markPaused(id:number, status:boolean){
        const usecase = new MarkHabitPause(habitRepositoryImpl);
        await usecase.execute(id,status);
        await this.loadHabits();
    }

    async deleteHabit(id:number){
        const usecase = new DeleteHabit(habitRepositoryImpl);
        await usecase.execute(id);
        await this.loadHabits();
    }
}

export const habitStore = new HabitStore();
