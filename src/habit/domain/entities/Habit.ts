//Define los modelos centrales

export interface Habit {
    id?: number;
    name: string;
    description?: string;
    days: Record<string, string>; // { mon: 1, tue: 0, ... }
    created_at: string;
    updated_at: string;
    completed: boolean;
    paused: boolean;
    current_streak: number;
    total_completed: number;
}