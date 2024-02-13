import { buyerController } from '@users/controllers/buyer';
import { Router } from 'express';

const router: Router = Router();
const buyerRoutes = (): Router => {
  router.get('/email', buyerController.getByEmail);
  router.get('/username', buyerController.getByCurrentUsername);
  router.get('/:username', buyerController.getByUsername);
  return router;
};

export { buyerRoutes };