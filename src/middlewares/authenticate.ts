import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { verifyAccessToken } from '../lib/jwt';
import { logger } from '../lib/winston';
import type { Request, Response, NextFunction } from 'express';
import type { Types } from 'mongoose';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // if there is no bearer token respond with 401
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      code: 'Unauthorized',
      message: 'No access token provided',
    });
    return;
  }

  // split out the token from the Bearer prefix
  const [_, token] = authHeader.split(' ');

  // if the token is not provided respond with 401
  if (!token) {
    res.status(401).json({
      code: 'Unauthorized',
      message: 'No access token provided',
    });
    return;
  }

  try {
    // verify the token and extract the userid from the payload
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };

    // attach the userId to the request object for the later use
    req.userId = jwtPayload.userId;

    // procced to the next middleware or route handler
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      // handle token expiration
      res.status(401).json({
        code: 'Unauthorized',
        message: 'Access token expired',
      });
      return;
    }

    // handle invalid token err
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'Unauthorized',
        message: 'Invalid access token',
      });
      return;
    }

    // catch for all other err
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: error,
    });

    logger.error('Error during authentication', error);
  }
};

export default authenticate;
