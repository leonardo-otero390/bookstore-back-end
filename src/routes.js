import { Router } from 'express';
import * as sessionsController from './controllers/sessionsController.js';
import { userSchemaValidation } from './middlewares/userSchemaValidation.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.post('/log-in', userSchemaValidation, sessionsController.upsert);

export default routes;
