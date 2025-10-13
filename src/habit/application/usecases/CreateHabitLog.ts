import { HabitLog } from "habit/domain/entities/HabitLog";
import { IHabitLogRepository } from "habit/domain/repositories/IHabitLogRepository";

export class CreateHabitLog{
    constructor(private habitLogRepo: IHabitLogRepository){};

    async execute(habitLog: HabitLog):Promise<void>{
        await this.habitLogRepo.create(habitLog)
    }
}