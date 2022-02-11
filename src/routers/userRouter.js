import { Router } from 'express';

import createUser from '../controllers/userController.js';
import userSchemaValidation from '../middlewares/userSchemaValidation.js';

const userRouter = Router();

userRouter.post('/sign-up', userSchemaValidation, createUser);

export default userRouter;
