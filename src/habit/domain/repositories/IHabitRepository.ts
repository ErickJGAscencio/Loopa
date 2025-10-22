//definen qué operaciones se pueden hacer.

import {Habit} from '../entities/Habit';

export interface IHabitRepository {
  create(habit: Habit): Promise<void>;
  getAll(): Promise<Habit[]>;
  markDone(id: number, status: boolean, total_completed:number, current_streak:number): Promise<void>;
  markPause(id:number, status: boolean):Promise<void>;
  deleteHabit(id:number):Promise<void>;
  updateHabit(id:number, name:string):Promise<void>;
}
