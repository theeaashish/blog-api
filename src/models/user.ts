import { Schema, model } from 'mongoose';

export interface User {
  username: string;
  password: string;
  email: string;
  role: 'admin' | 'user';
  firstName?: string;
  lastName?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    x?: string;
    youtube?: string;
  };
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      maxLength: [20, 'Username must be less than 20 characters'],
      unique: [true, 'Username must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      maxLength: [50, 'Email must be less than 50 characters'],
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: { values: ['admin', 'user'], message: '{VALUE} is not supported' },
      required: [true, 'Role is required'],
      default: 'user',
    },
    firstName: {
      type: String,
      maxLength: [20, 'First name must be less than 20 characters'],
    },
    lastName: {
      type: String,
      maxLength: [20, 'Last name must be less than 20 characters'],
    },
    socialLinks: {
      website: {
        type: String,
        maxLength: [100, 'Website must be less than 100 characters'],
      },
      facebook: {
        type: String,
        maxLength: [100, 'Facebook must be less than 100 characters'],
      },
      instagram: {
        type: String,
        maxLength: [100, 'Instagram must be less than 100 characters'],
      },
      linkedin: {
        type: String,
        maxLength: [100, 'Linkedin must be less than 100 characters'],
      },
      x: {
        type: String,
        maxLength: [100, 'X must be less than 100 characters'],
      },
      youtube: {
        type: String,
        maxLength: [100, 'Youtube must be less than 100 characters'],
      },
    },
  },
  { timestamps: true },
);

export default model<User>('User', userSchema);
