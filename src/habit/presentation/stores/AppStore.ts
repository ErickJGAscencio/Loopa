import { HabitLogRepositoryImpl } from "../../infrastructure/repositories/HabitLogRepositoryImpl";
import { action, makeAutoObservable } from "mobx";

const habitLogRepositoryImpl = new HabitLogRepositoryImpl();

class AppStore {
  dbReady: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      setDbReady: action,
    });
  }

  setDbReady(dbReady: boolean) {
    this.dbReady = dbReady;
  }
}

export const appStore = new AppStore();