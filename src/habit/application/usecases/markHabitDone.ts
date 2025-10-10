import { Habit } from '../../domain/entities/Habit';
import { IHabitRepository } from '../../domain/repositories/IHabitRepository';

export class MarkHabitDone {
    constructor(private habitRepo: IHabitRepository) { }

    async execute(id: number, status: boolean): Promise<void> {
        const habits = await this.habitRepo.markHabitDone(id, status);
        return habits;
    }
}