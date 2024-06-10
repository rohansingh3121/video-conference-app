import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Trying to connect with MongoDB');
    await mongoose.connect('MONGODB-CONNECTION');
    console.log('MongoDB connected...');
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
