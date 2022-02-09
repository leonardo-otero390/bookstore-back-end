import logInSchema from '../schemas/logInSchema.js';

export default function logInSchemaValidation(req, res, next) {
  const logIn = req.body;

  const result = logInSchema.validate(logIn);
  if (result.error) {
    return res.sendStatus(400);
  }

  return next();
}
