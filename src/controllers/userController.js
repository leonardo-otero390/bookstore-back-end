import bcrypt from 'bcrypt';
import dayjs from 'dayjs';

import db from '../database/connection.js';

export async function createUser(req, res) {
  const newUser = req.body;

  try {
    const usersCollection = db.collection('users');

    if (await usersCollection.findOne({ email: newUser.email })) {
      res.status(409).send('Um usuário com esse e-mail já está cadastrado');
      return;
    }

    newUser.hashedPassword = bcrypt.hashSync(newUser.password, 10);
    delete newUser.password;
    newUser.purchases = [];

    await usersCollection.insertOne(newUser);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send('Houve uma falha ao cadastrar usuário. Por favor, tente novamente');
  }
}

function valueOfItems(items) {
  let value = 0.0;

  items.forEach((item) => {
    value += item.quantityInCart * item.price;
  });

  return value;
}

export async function registerPurchase(req, res) {
  console.log(req.body);

  const newPurchase = {};
  newPurchase.items = req.body;

  try {
    const { userId } = res.locals;

    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ _id: userId });

    newPurchase.value = valueOfItems(newPurchase.items);
    newPurchase.date = dayjs().format('DD/MM/YYYY');

    const updatedPurchases = user.purchases;
    updatedPurchases.push(newPurchase);

    const productsCollection = db.collection('products');

    for (let i = 0; i < newPurchase.items.length; i += 1) {
      const item = newPurchase.items[i];

      await productsCollection.updateOne(
        { title: item.title },
        { $inc: { quantity: -item.quantityInCart } }
      );
    }

    await usersCollection.updateOne(
      { _id: userId },
      { $set: { purchases: updatedPurchases } }
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        'Houve uma falha ao finalizar a compra. Por favor, tente novamente'
      );
  }
}
