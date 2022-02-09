import logInSchema from '../schemas/logInSchema.js';

export function userSchemaValidation(req, res, next) {
  const logIn = req.body;

  const result = logInSchema.validate(logIn);
  if (result.error) {
    return res.sendStatus(400);
  }

  return next();
}
