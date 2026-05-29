import * as SQLite from 'expo-sqlite';

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('codecards.db').then(async (db) => {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS cards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mode TEXT NOT NULL,
          problem TEXT NOT NULL,
          approach TEXT,
          time_complexity TEXT,
          space_complexity TEXT,
          key_insight TEXT,
          edge_cases TEXT,
          difficulty TEXT,
          patterns TEXT NOT NULL DEFAULT '[]',
          confidence INTEGER NOT NULL DEFAULT 3,
          next_review_at INTEGER,
          photo_uri TEXT,
          created_at INTEGER NOT NULL
        );
      `);
      return db;
    });
  }
  return dbPromise;
}
