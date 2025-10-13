//Definimos las operaciones que se pueden ahcer

import { HabitLog } from "../entities/HabitLog";

export interface IHabitLogRepository{
    create(habitLog:HabitLog):Promise<void>;
    getAll():Promise<HabitLog[]>;
}