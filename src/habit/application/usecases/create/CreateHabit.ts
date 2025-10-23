import { Habit } from '../../../domain/entities/Habit.ts';
import { IHabitRepository } from '../../../domain/repositories/IHabitRepository.ts';

export class CreateHabit {
    constructor(private habitRepo: IHabitRepository) { }

    async execute(habit: Habit): Promise<void> {
        if (!habit.name) {
            throw new Error('Nombre y horarios son requeridos');
        }

        //Lódigca de negocio
        // habit.created_at = new Date().toISOString();
        // habit.updated_at = habit.created_at;
        // habit.paused = false;

        await this.habitRepo.create(habit);
    }
}