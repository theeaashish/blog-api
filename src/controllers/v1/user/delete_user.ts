import { logger } from '../../../lib/winston';
import User from '../../../models/user';
import type { Request, Response } from 'express';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    const user = await User.deleteOne({ _id: userId });

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });
    logger.error('Error while deleting a user', error);
  }
};

export default deleteUser;
