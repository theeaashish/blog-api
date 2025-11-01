import { Router } from 'express';
import { body } from 'express-validator';
import authenticate from '../../middlewares/authenticate';
import authorize from '../../middlewares/authorize';
import getCurrentUser from '../../controllers/v1/user/get_current_user';
import updateCurrentUser from '../../controllers/v1/user/update_current_user';
import User from '../../models/user';
import validationError from '../../middlewares/validationError';
import deleteCurrentUser from '../../controllers/v1/user/delete_current_user';

const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['user', 'admin']),
  getCurrentUser,
);

router.put(
  '/current',
  authenticate,
  authorize(['user', 'admin']),
  body('username')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('Username must be between 2 and 30 characters')
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });

      if (userExists) {
        throw new Error('Username already exists');
      }
    }),
  body('email')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Email must be less than 100 characters')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw new Error('Email already exists');
      }
    }),
  body('password')
    .optional()
    .isLength({ min: 8, max: 100 })
    .withMessage('Password must be between 8 and 100 characters'),
  body('first_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage('First name must be less than 20 characters'),
  body('last_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Last name must be less than 20 characters'),
  body(['website', 'facebook', 'instagram', 'linkedin', 'x', 'youtube'])
    .optional()
    .isURL()
    .withMessage('Url must be a valid URL')
    .isLength({ max: 100 })
    .withMessage('Url must be less than 100 characters'),
  validationError,
  updateCurrentUser,
);

router.delete(
  '/current',
  authenticate,
  authorize(['user', 'admin']),
  deleteCurrentUser,
);

router.get('/', authenticate, authorize(['admin']), )

export default router;
