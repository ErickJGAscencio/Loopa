import { Habit } from '../../domain/entities/Habit';
import { IHabitRepository } from '../../domain/repositories/IHabitRepository';

export class CreateHabit {
    constructor(private habitRepo: IHabitRepository) { }

    async execute(habit: Habit): Promise<void> {
        // Validación Básica
        if (!habit.name) {
            throw new Error('Nombre y horarios son requeridos');
        }

        //Lódigca de negocio
        habit.createdAt = new Date().toISOString();
        habit.updatedAt = habit.createdAt;
        habit.paused = false;

        await this.habitRepo.create(habit);
    }
}