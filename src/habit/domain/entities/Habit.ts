//Define los modelos centrales

export interface Habit {
    id?: number;
    name: string;
    description?: string;
    reminderTimes: string[], // ["08:00", "20:00"]
    days: Record<string, string>; // { mon: 1, tue: 0, ... }
    createdAt: string;
    updatedAt: string;
    completed: boolean;
    paused: boolean;
}