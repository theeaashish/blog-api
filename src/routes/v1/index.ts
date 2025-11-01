import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import blogRoutes from './blog';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    message: 'API is Live',
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

export default router;
