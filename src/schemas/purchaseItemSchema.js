import joi from 'joi';

const purchaseItemSchema = joi.object({
  _id: joi.string().required(),
  quantity: joi.number().integer().positive().min(0).required(),
});

export default purchaseItemSchema;
