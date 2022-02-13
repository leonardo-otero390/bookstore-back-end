import purchaseItemSchema from '../schemas/purchaseItemSchema.js';

export default function validatePurchase(req, res, next) {
  for (let i = 0; i < req.body.items.length; i += 1) {
    const item = req.body.items[i];

    const validation = purchaseItemSchema.validate(item);
    if (validation.error) {
      return res
        .status(400)
        .send(
          'Os dados dos itens da compra apresentam algum problema.\nNão foi possível finalizá-la'
        );
    }
  }

  return next();
}
