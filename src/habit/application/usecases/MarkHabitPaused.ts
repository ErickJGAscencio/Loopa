import { IHabitRepository } from "habit/domain/repositories/IHabitRepository";

export class MarkHabitPause{
    constructor(private habitRepo: IHabitRepository){}

    async execute(id:number, status:boolean): Promise<void>{
        const habitUpdate = await this.habitRepo.markPause(id, status);
    }
}