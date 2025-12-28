require('dotenv').config();
const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const sampleAssignments = require('../data/sample-assignments');

const setupLocalMongo = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');

    // Insert sample assignments
    const result = await Assignment.insertMany(sampleAssignments);
    console.log(`Inserted ${result.length} sample assignments`);

    console.log('Local MongoDB setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB setup failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure MongoDB is running locally');
    console.log('2. Check if the database name is correct');
    console.log('3. Verify connection string in .env file');
    process.exit(1);
  }
};

setupLocalMongo();