// Capa DATASOURCES que conecta mi logica de negocio con el nmundo real: bd, apis, local storage.

import { Habit } from 'habit/domain/entities/Habit';
import { HabitLog } from 'habit/domain/entities/HabitLog';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

type HabitRow = {
  id: number;
  name: string;
  description: string | null;
  days: string;
  created_at: string;
  updated_at: string;
  completed: number;
  paused: number;
};


export const getDBConnection = async () => {
  try {
    const db = await SQLite.openDatabase({ name: 'loopa.db', location: 'default' });
    console.log('✅ Base de datos abierta correctamente');
    return db;
  } catch (error) {
    console.error('Error al abrir la base de datos:', error);
    throw error;
  }
};

//TABLES
export const createTables = async (db: any) => {
  try {
    await createHabitsTable(db);
    await createHabitLogsTable(db);
    console.log("✅ Tablas creadas correctamente");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
  }
};

const createHabitsTable = async (db: any) => {
  const query = `
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      days TEXT NOT NULL,
      created_at TEXT,
      updated_at TEXT,
      completed INTEGER NOT NULL,
      paused INTEGER NOT NULL,
      current_streak INTEGER NOT NULL,
      total_completed INTEGER NOT NULL
    );
  `;
  await db.executeSql(query);
};

const createHabitLogsTable = async (db: any) => {
  const query = `
    CREATE TABLE IF NOT EXISTS habit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      completed INTEGER NOT NULL,
      FOREIGN KEY (habit_id) REFERENCES habits(id)
    );
  `;
  await db.executeSql(query);
};

//----------------------------->
//HABITS

export const insertHabit = async (db: any, habit: any) => {
  const query = `
  INSERT INTO habits (
    name, description, days, created_at, updated_at,
    completed, paused, current_streak, total_completed
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

  const params = [
    habit.name,
    habit.description,
    JSON.stringify(habit.days),
    new Date().toISOString(),
    new Date().toISOString(),
    habit.completed ? 1 : 0,
    habit.paused ? 1 : 0,
    habit.current_streak ?? 0,
    habit.total_completed ?? 0,
  ];

  try {
    await db.executeSql(query, params);
  } catch (error) {
    console.error("SQLite error: ", error);
  }
};

export async function getHabits(db: any): Promise<Habit[]> {
  const results = await db.executeSql('SELECT * FROM habits;');
  // console.log("RAW DB RESULTS:", results);
  return results[0].rows.raw().map((row: HabitRow) => ({
    ...row,
    days: JSON.parse(row.days),
    paused: !!row.paused
  }));
}

export async function markHabitDone(id: number, status: boolean, db: any, total_completed: number, current_streak: number): Promise<void> {
  const query = `UPDATE habits SET completed = ?, total_completed = ?, current_streak = ?, updated_at = ? WHERE id = ?;`;
  const params = [
    status,
    total_completed + 1,
    current_streak,
    new Date().toISOString(),
    id
  ];

  try {
    await db.executeSql(query, params);
    // console.log(`✅ Hábito ${id} actualizado a ${status ? 'completado' : 'pendiente'}`);
  } catch (error) {
    console.error("Error al marcar hábito como completado:", error);
    throw error;
  }
}

export async function markHabitPause(id: number, status: boolean, db: any) {
  const query = 'UPDATE habits SET paused = ? WHERE id = ?';
  const params = [
    status,
    id
  ];

  try {
    await db.executeSql(query, params);
  } catch (error) {
    console.error("Error pausing habit: ", error);
  }
}

export async function deleteHabit(id: number, db: any) {
  const query = 'DELETE FROM habits WHERE id = ?';
  const params = [
    id
  ]

  try {
    await db.executeSql(query, params);
  } catch (error) {
    console.error("Error deleting habit: ", error);
  }
}

export async function resetHabitsPerDay(db: any): Promise<void> {
  const query = `UPDATE habits SET completed = ?;`;
  const params = [
    false,
  ];

  try {
    await db.executeSql(query, params);
  } catch (error) {
    console.error("Error al marcar hábito como completado:", error);
    throw error;
  }
}

// HABITS LOGS
export const insertHabitLog = async (db: any, habitLog: HabitLog) => {
  const query = `
  INSERT INTO habit_logs (
    habit_id, date, completed 
  )
  VALUES (?, ?, ?);
`;

  const params = [
    habitLog.habit_id,
    habitLog.date,
    habitLog.completed ?? 0,
  ];

  try {
    await db.executeSql(query, params);
  } catch (error) {
    console.error("SQLite error: ", error);
  }
};

export async function getHabitsLogs(db: any): Promise<HabitLog[]> {
  try {
    const results = await db.executeSql('SELECT * FROM habit_logs;');
    const rows = results[0].rows;

    const logs: HabitLog[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      logs.push(item);
    }

    return logs;
  } catch (error) {
    console.error("Error en getHabitsLogs:", error);
    return [];
  }
}



