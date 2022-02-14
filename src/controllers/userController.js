import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import db from '../database/connection.js';
import { send } from '../services/emailService.js';

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

export async function registerPurchase(req, res) {
  const newPurchase = req.body;
  const { paymentWay } = newPurchase;

  if (
    paymentWay !== 'credit card' &&
    paymentWay !== 'billet' &&
    paymentWay !== 'pix'
  ) {
    res
      .status(400)
      .send(
        'Os dados dos itens da compra apresentam algum problema.\nNão foi possível finalizá-la'
      );
    return;
  }

  try {
    const { userId } = res.locals;

    const usersCollection = db.collection('users');

    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      res.status(401).send('Você não é mais um usuário cadastrado');
      return;
    }

    const productsCollection = db.collection('products');

    // The stock must be checked before any change in the DB
    let value = 0.0;
    let emailMessage = 'Você comprou os seguintes itens:<br /><br />';
    for (let i = 0; i < newPurchase.items.length; i += 1) {
      const item = newPurchase.items[i];

      const product = await productsCollection.findOne({
        _id: new ObjectId(item._id),
      });

      if (product.quantity < item.quantity) {
        res
          .status(409)
          .send(
            'O estoque disponível não foi suficiente para finalizar a compra'
          );
        return;
      }

      value += item.quantity * product.price;
      emailMessage += ` - ${item.quantity} un. de '${product.title}'<br />`;
    }

    newPurchase.value = value;
    newPurchase.date = dayjs().format('DD/MM/YYYY');

    const updatedPurchases = user.purchases;
    updatedPurchases.push(newPurchase);

    for (let i = 0; i < newPurchase.items.length; i += 1) {
      const item = newPurchase.items[i];

      await productsCollection.updateOne(
        { _id: new ObjectId(item._id) },
        { $inc: { quantity: -item.quantity } }
      );
    }

    await usersCollection.updateOne(
      { _id: userId },
      { $set: { purchases: updatedPurchases } }
    );

    emailMessage += `<br />Pelo valor de R$ ${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    await send({ email: user.email, content: emailMessage });

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
