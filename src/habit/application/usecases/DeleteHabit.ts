import { IHabitRepository } from '../../domain/repositories/IHabitRepository.ts';

export class DeleteHabit {
    constructor(private habitRepo: IHabitRepository) { }

    async execute(id: number): Promise<void> {
        const habits = await this.habitRepo.deleteHabit(id);
        return habits;
    }
}