import db from '../database/connection.js';

export async function getProducts(req, res) {
  try {
    const products = await db.collection('products').find().toArray();

    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        'Houve uma falha ao buscar os produtos. Por favor, recarregue a página'
      );
  }
}
