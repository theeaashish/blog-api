import mongoose, { type ConnectOptions } from 'mongoose';
import config from '../config';

const clientOptions: ConnectOptions = {
  dbName: 'blog-api',
  appName: 'Blog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(config.MONGO_URI, clientOptions);

    console.log('Connected to the database successfully.');
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    console.log('Error connecting to the database', error);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from the database successfully.');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    console.log('Error disconnecting from the database', error);
  }
};
