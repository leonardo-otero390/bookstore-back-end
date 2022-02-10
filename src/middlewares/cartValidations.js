import * as cartSchemas from '../schemas/cartSchemas.js';

export function insertBody(req, res, next) {
  if (cartSchemas.insertBody.validate(req.body).error) {
    return res.sendStatus(400);
  }
  return next();
}
export function updateBody(req, res, next) {
  if (cartSchemas.updateBody.validate(req.body).error) {
    return res.sendStatus(400);
  }
  return next();
}
