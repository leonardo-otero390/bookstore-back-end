import { ObjectId } from 'mongodb';
import db from '../database/connection.js';

export async function insert(req, res) {
  const { productId, amount } = req.body;
  const { userId } = res.locals;
  try {
    const { insertedId: cartId } = await db.collection('carts').insertOne({
      userId,
      products: [{ id: productId, amount }],
      checkoutDate: false,
    });
    return res
      .status(201)
      .send({ cartId, products: [{ id: productId, amount }] });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function update(req, res) {
  const { cartId, productId, amount } = req.body;
  const { userId } = res.locals;
  try {
    const cart = await db
      .collection('carts')
      .findOne({ _id: new ObjectId(cartId), userId, checkoutDate: false });
    if (!cart)
      return res
        .status(404)
        .send("The isn't an open cart with this Id or you are not authorized");
    const cartProducts = cart.products;
    const productIndex = cartProducts.findIndex(
      (product) => product.id === productId
    );
    if (productIndex >= 0) {
      cartProducts[productIndex].amount = amount;
    } else {
      cartProducts.push({ id: productId, amount });
    }
    await db
      .collection('carts')
      .updateOne(
        { _id: new ObjectId(cartId) },
        { $set: { products: cartProducts } }
      );
    return res.status(201).send({ cartId, products: cartProducts });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
