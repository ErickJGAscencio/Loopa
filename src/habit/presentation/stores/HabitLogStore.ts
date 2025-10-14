import { CreateHabitLog } from "../../application/usecases/CreateHabitLog";
import { GetHabitsLogs } from "../../application/usecases/GetHabitLogs";
import { HabitLog } from "../../domain/entities/HabitLog";
import { HabitLogRepositoryImpl } from "../../infrastructure/repositories/HabitLogRepositoryImpl";
import { action, makeAutoObservable } from "mobx";

const habitLogRepositoryImpl = new HabitLogRepositoryImpl();

class HabitLogStore {
  logs: HabitLog[] = [];

  constructor() {
    makeAutoObservable(this, {
      setLogs: action,
    });
  }

  setLogs(logs: HabitLog[]) {
    this.logs = logs;
  }

  async loadLogs() {
    const usecase = new GetHabitsLogs(habitLogRepositoryImpl);
    const logs = await usecase.execute();
    this.setLogs(logs);
  }

  async createHabitLog(habitLog: HabitLog) {
    const usecase = new CreateHabitLog(habitLogRepositoryImpl);
    await usecase.execute(habitLog);
    await this.loadLogs();
  }
}

export const habitLogStore = new HabitLogStore();