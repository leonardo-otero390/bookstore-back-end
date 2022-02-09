import joi from 'joi';

const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default logInSchema;
