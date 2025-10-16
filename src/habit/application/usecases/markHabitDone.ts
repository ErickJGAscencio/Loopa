import { IHabitRepository } from '../../domain/repositories/IHabitRepository.ts';

export class MarkHabitDone {
    constructor(private habitRepo: IHabitRepository) { }

    async execute(id: number, status: boolean, total_completed:number, current_streak:number): Promise<void> {
        const habits = await this.habitRepo.markDone(id, status, total_completed, current_streak);
        return habits;
    }
}