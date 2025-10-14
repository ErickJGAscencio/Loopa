import { HabitLog } from "habit/domain/entities/HabitLog";
import { IHabitLogRepository } from "habit/domain/repositories/IHabitLogRepository";
import { getDBConnection, getHabitsLogs, insertHabitLog } from "../datasources/HabitDatabase";

export class HabitLogRepositoryImpl implements IHabitLogRepository {

    async create(habitLog: HabitLog) {
        const db = await getDBConnection();
        await insertHabitLog(db, habitLog);
    }

    async getAll(): Promise<HabitLog[]> {
        // console.log("Entre a getAll en Impl");
        const db = await getDBConnection();
        // console.log("Se conectó a la db desde Impl");
        
        const habitsLogs = await getHabitsLogs(db);
        // console.log("--------------------LOGS DESDE REPO:", habitsLogs);
        return habitsLogs;
    }
}