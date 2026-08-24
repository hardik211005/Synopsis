const mongoose = require('mongoose');

const connectDB = async () => {
  // If already connected, do not attempt reconnecting
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/career_compass';
  
  try {
    // Set short timeout for initial connect attempt
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`[Database] Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.warn(`[Database] Could not connect to primary MongoDB (${error.message}).`);
    console.log('[Database] Initializing MongoMemoryServer fallback for seamless local execution...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const memoryUri = mongod.getUri();
      
      await mongoose.connect(memoryUri);
      console.log(`[Database] Connected to In-Memory MongoDB at ${memoryUri}`);
    } catch (memError) {
      console.error('[Database] Failed to launch MongoMemoryServer fallback:', memError.message);
    }
  }
};

module.exports = connectDB;

