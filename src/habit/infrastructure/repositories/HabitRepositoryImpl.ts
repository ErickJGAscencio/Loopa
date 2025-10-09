// Se implementan las interfaces definias en /domain/repositories.
// Aquí se traducen entre entidasdes y datos crudos.

import { Habit } from '../../domain/entities/Habit';
import { IHabitRepository } from '../../domain/repositories/IHabitRepository';
import { getDBConnection, getHabits, insertHabit } from '../datasources/HabitDatabase';

export class HabitRepositoryImpl implements IHabitRepository {
    async create(habit: Habit) {
        const db = await getDBConnection();
        await insertHabit(db, habit); // serializa y ejecuta SQL
    }

    async getAll(): Promise<Habit[]> {
        const db = await getDBConnection();
        const habits = await getHabits(db);
        console.log("HÁBITOS DESDE REPO:", habits);
        return habits;
    }
}