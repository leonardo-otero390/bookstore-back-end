import { Router } from 'express';

import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import productRouter from './productRouter.js';

const routes = new Router();

routes.use(userRouter);
routes.use(sessionRouter);
routes.use(productRouter);

export default routes;
