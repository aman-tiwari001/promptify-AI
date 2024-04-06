import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('Database already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promptify-db',
    });
    isConnected = true;
    console.log("🚀 Database Connected!")

  } catch (error) {
    console.log('💩 Error occured while connecting to Database', error);
  }
};
