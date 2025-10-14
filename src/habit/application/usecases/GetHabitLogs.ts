import { HabitLog } from 'habit/domain/entities/HabitLog.ts';
import { IHabitLogRepository } from 'habit/domain/repositories/IHabitLogRepository.ts';

export class GetHabitsLogs {
  constructor(private habitLogRepo: IHabitLogRepository) { }

  async execute(): Promise<HabitLog[]> {
    const habitsLogs = await this.habitLogRepo.getAll();
    return habitsLogs;
  }
}
