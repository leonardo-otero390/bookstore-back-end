import { Router } from 'express';

import userRouter from './userRouter.js';
import cartRouter from './cartRouter.js';

const routes = new Router();

routes.use(userRouter);
routes.use('/cart', cartRouter);

export default routes;
