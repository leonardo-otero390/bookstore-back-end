import { Router } from 'express';
import * as dbController from '../controllers/dbController.js';

const routes = Router();

routes.post('/books', dbController.populateWithBooks);
routes.delete('/books', dbController.deleteAllBooks);

export default routes;
