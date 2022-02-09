import joi from 'joi';

const logInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export function login(body) {
  const result = logInSchema.validate(body);
  if (result.error) return false;
  return true;
}
