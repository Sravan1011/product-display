import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true, 
    } as mongoose.ConnectOptions);
    console.log('MongoDB connected successfully');
  } catch (err) {
     
    const error = err as Error;
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
