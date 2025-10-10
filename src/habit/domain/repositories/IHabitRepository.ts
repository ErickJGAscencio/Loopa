//definen qué operaciones se pueden hacer.

import {Habit} from '../entities/Habit';

export interface IHabitRepository {
  create(habit: Habit): Promise<void>;
  getAll(): Promise<Habit[]>;
  markDone(id: number, status: boolean): Promise<void>;
}
