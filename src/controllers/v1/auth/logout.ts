import { logger } from '../../../lib/winston';
import Token from '../../../models/token';
import type { Request, Response } from 'express';
import config from '../../../config';

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await Token.deleteOne({ token: refreshToken });
      logger.info('Refresh token deleted', {
        user: req.userId,
        token: refreshToken,
      });
    }

    // clear the cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.sendStatus(204);

    logger.info('User logged out successfully', { user: req.userId });
  } catch (error) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });

    logger.error('Error creating new user', error);
  }
};

export default logout;
