import { healthController } from '@users/controllers/health';
import { Router } from 'express';

const router: Router = Router();
const healthRoutes = (): Router => {
  router.get('/user-health', healthController.health);
  return router;
};

export { healthRoutes };