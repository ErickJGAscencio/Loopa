// Se implementan las interfaces definias en /domain/repositories.
// Aquí se traducen entre entidasdes y datos crudos.

import { Habit } from '../../domain/entities/Habit';
import { IHabitRepository } from '../../domain/repositories/IHabitRepository.ts';
import { deleteHabit, getDBConnection, getHabits, insertHabit, markHabitDone, markHabitPause } from '../datasources/HabitDatabase';

export class HabitRepositoryImpl implements IHabitRepository {
    
    async create(habit: Habit) {
        const db = await getDBConnection();
        await insertHabit(db, habit); // serializa y ejecuta SQL
    }

    async getAll(): Promise<Habit[]> {
        const db = await getDBConnection();
        const habits = await getHabits(db);
        // console.log("--------------------HÁBITOS DESDE REPO:", habits);
        return habits;
    }

    async markDone(id: number, status: boolean, total_completed:number, current_streak:number){
        const db = await getDBConnection();
        await markHabitDone(id, status, db, total_completed, current_streak);
    }

    async markPause(id:number, status:boolean){
        const db = await getDBConnection();
        await markHabitPause(id, status, db);
    }

    async deleteHabit(id:number){
        const db = await getDBConnection();
        await deleteHabit(id, db);
    }
}