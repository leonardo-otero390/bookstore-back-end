import { Router } from 'express';
import validateToken from '../middlewares/tokenValidator.js';
import * as cartsController from '../controllers/cartsController.js';
import * as cartValidations from '../middlewares/cartValidations.js';

const routes = Router();

routes.use(validateToken);
routes.post('/', cartValidations.insertBody, cartsController.insert);
routes.put('/', cartValidations.updateBody, cartsController.update);
routes.get('/:cartId', cartsController.findById)

export default routes;
