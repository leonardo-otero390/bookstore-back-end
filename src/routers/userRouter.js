import { Router } from 'express';

import { createUser, registerPurchase } from '../controllers/userController.js';
import userSchemaValidation from '../middlewares/userSchemaValidation.js';
import validateToken from '../middlewares/tokenValidator.js';
import validatePurchase from '../middlewares/purchaseValidator.js';

const userRouter = Router();

userRouter.post('/sign-up', userSchemaValidation, createUser);
userRouter.post('/checkout', validatePurchase, validateToken, registerPurchase);

export default userRouter;
