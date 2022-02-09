import { Router } from 'express';
import connection from '../database/connection.js';

const routes = new Router();

routes.get('/health', async (req, res) => {
  res.sendStatus(200);
});

export default routes;
