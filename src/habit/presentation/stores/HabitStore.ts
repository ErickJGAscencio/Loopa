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
import { notificationStore } from "./NotificationStore";
import { UpdateHabit } from "../../application/usecases/UpdateHabit";

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
        // notificationStore.scheduleTypedReminders(habitStore.habits);
    }

    get habitsByDay(): (date: string) => Habit[] {//Hábitos realizados X día
        return (date: string) => {
            const logs = habitLogStore.logs.filter(log => {
                const logDate = log.date.split('T')[0]; //log.date.split('T')[0] Separamos la fecha 00/00/00 [T]00:00:00 y guardamos solo lo que hay en indice 0 (fecha)
                return logDate === date && log.completed;
            });
            const completedIds = logs.map(log => log.habit_id); //Obtenemos los ids de los habitos completados
            const filteredHabits = this.habits.filter(habit =>
                habit.id != null &&
                completedIds.includes(habit.id) //Obtenemos el objeto del habito que se haye en la lista y corresponda a un id dentro del log
            );
            return filteredHabits;
        };
    }

    async loadHabits() {// Carga todos los hábitos
        const usecase = new GetHabits(habitRepositoryImpl);
        const habits = await usecase.execute();
        this.setHabits(habits);
    }

    async createHabit(habit: Habit) {//Crea un hábito
        const usecase = new CreateHabit(habitRepositoryImpl);
        await usecase.execute(habit);
        await this.loadHabits();
    }

    async markHabitDone(id: number, status: boolean, total_completed:number, current_streak:number) {//Marca como completado un hábito
        const usecase = new MarkHabitDone(habitRepositoryImpl);
        await usecase.execute(id, status, total_completed, current_streak);
        await this.loadHabits();
    }

    async markPaused(id:number, status:boolean){// Marca como pausado o activo un hábito
        const usecase = new MarkHabitPause(habitRepositoryImpl);
        await usecase.execute(id,status);
        await this.loadHabits();
    }

    async deleteHabit(id:number){// Borra un hábito
        const usecase = new DeleteHabit(habitRepositoryImpl);
        await usecase.execute(id);
        await this.loadHabits();
    }

    async updateHabit(id:number, name:string){
        const usecase = new UpdateHabit(habitRepositoryImpl);
        await usecase.execute(id, name);
        await this.loadHabits();
    }

}

export const habitStore = new HabitStore();
