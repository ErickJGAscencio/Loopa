import { HabitLog } from "habit/domain/entities/HabitLog";
import { IHabitLogRepository } from "habit/domain/repositories/IHabitLogRepository";
import { getDBConnection, getHabitsLogs, insertHabitLog } from "../datasources/HabitDatabase";

export class HabitLogRepositoryImpl implements IHabitLogRepository {

    async create(habitLog: HabitLog) {
        const db = await getDBConnection();
        await insertHabitLog(db, habitLog);
    }

    async getAll(): Promise<HabitLog[]> {
        console.log("getAll HabitLogRepositoryImpl");

        const db = getDBConnection();
        const habitsLogs = await getHabitsLogs(db);
        return habitsLogs;
    }
}