import { Router } from 'express';

import * as sessionsController from '../controllers/sessionController.js';
import logInSchemaValidation from '../middlewares/loginSchemaValidation.js';
import validateToken from '../middlewares/tokenValidator.js';

const sessionRouter = Router();

sessionRouter.post('/log-in', logInSchemaValidation, sessionsController.upsert);
sessionRouter.delete('/sessions', validateToken, sessionsController.remove);

export default sessionRouter;
