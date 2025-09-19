import * as SQLite from 'expo-sqlite';
import { Place } from '../model/place';

let db: SQLite.SQLiteDatabase | null;

export const getDb = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('places.db');
  }
  return db;
};

export const init = async () => {
  const db = await getDb();
  try {
    await db.execAsync(
      ` PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS places (
          id INTEGER PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
      )`,
    );
  } catch (error) {
    console.log(error);
  }
};

export const insertPlace = async (place: Place) => {
  const db = await getDb();
  console.log('db: ' + db);
  try {
    const result = await db.runAsync(
      'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    );
    console.log(result);
    return result.lastInsertRowId;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlaces = async () => {
  const db = await getDb();
  const places = [];
  for await (const row of db.getEachAsync('SELECT * FROM places')) {
    const r = row as any;
    places.push(
      new Place(r.id, r.title, r.imageUri, { address: r.address, lat: r.lat, lng: r.lng }),
    );
  }
  return places;
};

export const fetchPlaceDetails = async (id: string) => {
  const db = await getDb();
  try {
    const row = await db.getFirstAsync('SELECT * FROM places WHERE id = ?', id);
    console.log(row);
    const r = row as any;
    return new Place(r.id, r.title, r.imageUri, { address: r.address, lat: r.lat, lng: r.lng });
  } catch (error) {
    console.log(error);
  }
};
