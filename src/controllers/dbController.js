import db from '../database/connection.js';
import { books } from '../database/mock.js';

export async function populateWithBooks(req, res) {
  try {
    db.collection('products').insertMany(books);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function deleteAllBooks(req, res) {
  try {
    db.collection('products').deleteMany({});
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
