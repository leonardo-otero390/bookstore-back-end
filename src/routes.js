import { Router } from 'express';
import * as sessionsController from './controllers/sessionsController.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});
routes.post('/log-in', sessionsController.upsert);

export default routes;
