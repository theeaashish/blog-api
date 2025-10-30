import { logger } from '../../../lib/winston';
import config from '../../../config';
import type { Request, Response } from 'express';

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(201).json({
      message: 'New user created',
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });

    logger.error('Error creating new user', error);
  }
};

export default register;