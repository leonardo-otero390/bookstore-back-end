import { Router } from 'express';

import createUser from '../controllers/userController.js';
import * as sessionsController from '../controllers/sessionsController.js';
import logInSchemaValidation from '../middlewares/loginSchemaValidation.js';
import userSchemaValidation from '../middlewares/userSchemaValidation.js';
import validateToken from '../middlewares/tokenValidator.js';

const userRouter = Router();

userRouter.post('/sign-up', userSchemaValidation, createUser);
userRouter.post('/log-in', logInSchemaValidation, sessionsController.upsert);
userRouter.delete('/sessions', validateToken, sessionsController.remove);

export default userRouter;
