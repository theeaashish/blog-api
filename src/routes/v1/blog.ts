import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import authorize from '../../middlewares/authorize';

const router = Router();

router.post('/', authenticate, authorize(['admin']));

export default router;
