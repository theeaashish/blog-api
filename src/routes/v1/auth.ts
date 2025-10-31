import { Router } from 'express';
import register from '../../controllers/v1/auth/register';
import { body } from 'express-validator';
import validationError from '../../middlewares/validationError';
import User from '../../models/user';

const router = Router();

router.post(
  '/register',
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 100 })
    .withMessage('Email must be less than 100 characters')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw new Error('User already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 100 })
    .withMessage('Password must be between 8 and 100 characters'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be a string')
    .isIn(['user', 'admin'])
    .withMessage('Role must be either "user" or "admin"'),

  validationError,
  register,
);

export default router;
