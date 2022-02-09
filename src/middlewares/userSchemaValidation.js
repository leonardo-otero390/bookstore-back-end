import userSchema from '../schemas/userSchema.js';

export default function userSchemaValidation(req, res, next) {
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    return res
      .status(400)
      .send('Todos os campos devem ser devidamente preenchidos');
  }

  return next();
}
