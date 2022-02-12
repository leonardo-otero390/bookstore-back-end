import { Router } from 'express';

import { createUser, registerPurchase } from '../controllers/userController.js';
import userSchemaValidation from '../middlewares/userSchemaValidation.js';
import validateToken from '../middlewares/tokenValidator.js';

const userRouter = Router();

userRouter.post('/sign-up', userSchemaValidation, createUser);
userRouter.post('/checkout', validateToken, registerPurchase);

export default userRouter;
