import { logger } from '../lib/winston';
import Blog from '../models/blog';
import type { Request, Response, NextFunction } from 'express';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (method === 'put' && !req.file) {
      next();
      return;
    }

    if (!req.file) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Banner image is required',
      });
      return;
    }

    if (req.file.size > MAX_FILE_SIZE) {
      res.status(413).json({
        code: 'ValidationError',
        message: 'File size exceeds the maximum limit of 2 MB',
      });
      return;
    }

    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId).select('banner.publicId').exec();
    } catch (error) {
      res.status(500).json({
        code: 'ServerError',
        message: 'Internal Server Error',
        error: error,
      });
      logger.error('Error while uploading Blog banner', error);
    }
  };
};

export default uploadBlogBanner;
