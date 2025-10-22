import { IHabitRepository } from '../../domain/repositories/IHabitRepository.ts';

export class UpdateHabit {
  constructor(private habitRepo: IHabitRepository) { }

  async execute(id:number, name:string): Promise<void> {
    const habit = await this.habitRepo.updateHabit(id, name);
    return;
  }
}