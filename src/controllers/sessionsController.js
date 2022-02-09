import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/connection.js';

export async function upsert(req, res) {
  const { email, password } = req.body;
  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) return res.sendStatus(401);
    if (!bcrypt.compareSync(password, user.hashedPassword))
      return res.sendStatus(401);
    const token = uuid();
    await db
      .collection('sessions')
      .updateOne(
        { userId: user._id },
        { $set: { token, userId: user._id } },
        { upsert: true }
      );
    return res.status(200).send(token);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
