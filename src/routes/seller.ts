import { sellerController } from '@users/controllers/seller';
import { Router } from 'express';

const router: Router = Router();
const sellerRoutes = (): Router => {
  router.get('/id/:sellerId', sellerController.getById);
  router.get('/username/:username', sellerController.getByUsername);
  router.get('/random/:size', sellerController.getRandomSellers);
  router.post('/create', sellerController.create);
  router.put('/:sellerId', sellerController.update);
  router.put('/seed/:count', sellerController.seedSeller);
  return router;
};

export { sellerRoutes };