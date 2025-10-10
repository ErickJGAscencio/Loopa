// Capa DATASOURCES que conecta mi logica de negocio con el nmundo real: bd, apis, local storage.

import { Habit } from 'habit/domain/entities/Habit';
import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase(
    {
      name: 'loopa.db',
      location: 'default'

    });
};

export const createTables = async (db: any) => {
  // await db.executeSql(`DROP TABLE IF EXISTS habits`);
  const query = `
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT ,
      days TEXT NOT NULL,
      created_at TEXT,
      updated_at TEXT,
      completed INTEGER NOT NULL,
      paused INTEGER NOT NULL
    );
  `;

  await db.executeSql(query);
};

export const insertHabit = async (db: any, habit: any) => {
  const query = `
    INSERT INTO habits (name, description, days, created_at, updated_at, completed, paused)
    VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [
    habit.name,
    habit.description,
    JSON.stringify(habit.days),
    new Date().toISOString(),
    new Date().toISOString(),
    habit.completed ? 1 : 0,
    habit.paused ? 1 : 0,
  ];
  try {
    await db.executeSql(query, params);
  } catch (error) {
    console.error("SQLite error: ", error);
  }
};

export async function getHabits(db:any): Promise<Habit[]> {
  const results = await db.executeSql('SELECT * FROM habits;');
  console.log("RAW DB RESULTS:", results);
  return results[0].rows.raw().map(row => ({
    ...row,
    reminderTimes: JSON.parse(row.reminder_times),
    days: JSON.parse(row.days),
    paused: !!row.paused
  }));
}