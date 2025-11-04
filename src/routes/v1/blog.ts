import { Router } from 'express';
import authenticate from '../../middlewares/authenticate';
import authorize from '../../middlewares/authorize';
import createBlog from '../../controllers/v1/blog/create_blog';
import multer from 'multer';
import uploadBlogBanner from '../../middlewares/uploadBlogBanner';

const upload = multer();

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  uploadBlogBanner('post'),
  createBlog,
);

export default router;
