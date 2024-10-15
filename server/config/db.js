import mongoose from 'mongoose';
import CONFIG from './config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(CONFIG.MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed', error.message);
    process.exit(1);
  }
};

export default connectDB;
