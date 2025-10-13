import { Habit } from '../../domain/entities/Habit';
import { IHabitRepository } from '../../domain/repositories/IHabitRepository.ts';

export class GetHabits {
  constructor(private habitRepo: IHabitRepository) {}

  async execute(): Promise<Habit[]> {
    const habits = await this.habitRepo.getAll();
    // console.log("HÁBITOS DESDE USECASE:", habits);
    return habits;
  }
}
