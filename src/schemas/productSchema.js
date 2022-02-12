import joi from 'joi';

const productSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  image: joi.string().uri().required(),
  price: joi.number().required(),
  quantity: joi.number().integer().positive().required(),
});

export default productSchema;
