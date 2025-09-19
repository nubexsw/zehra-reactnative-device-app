//import * as SQLite from 'expo-sqlite';
import { Place } from '../model/place';

//const db = await SQLite.openDatabaseAsync('places.db');

export const init = () => {
  //   return db.execAsync(
  //     ` PRAGMA journal_mode = WAL;
  //         CREATE TABLE IF NOT EXISTS places (
  //         id INTEGER PRIMARY KEY NOT NULL,
  //         title TEXT NOT NULL,
  //         imageUri TEXT NOT NULL,
  //         address TEXT NOT NULL,
  //         lat REAL NOT NULL,
  //         lng REAL NOT NULL
  //     )`,
  //   );
};

export const insertPlace = (place: Place) => {
  //   return db.runAsync(
  //     'INSERT INTO places (id, title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?)',
  //     place.id,
  //     place.title,
  //     place.imageUri,
  //     place.address,
  //     place.location.lat,
  //     place.location.lng,
  //   );
};
