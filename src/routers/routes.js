import { Router } from 'express';

import userRouter from './userRouter.js';
import productRouter from './productRouter.js';

const routes = new Router();

routes.use(userRouter);
routes.use(productRouter);

export default routes;
