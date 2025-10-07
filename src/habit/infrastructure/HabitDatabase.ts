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
    const query = `
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      frequency TEXT NOT NULL,
      created_at TEXT,
      updated_at TEXT
    );-    
  `;
    await db.executeSql(query);
};

export const insertHabit = async (db:any, habit:any) => {
  const query = `
    INSERT INTO habits (name, frequency, created_at, updated_at)
    VALUES (?, ?, ?, ?);
  `;
  const params = [habit.name, habit.frequency, new Date().toISOString(), new Date().toISOString()];
  await db.executeSql(query, params);
};

export const getHabits = async (db:any) => {
  const results = await db.executeSql('SELECT * FROM habits;');
  return results[0].rows.raw(); // Devuelve array de objetos
};
