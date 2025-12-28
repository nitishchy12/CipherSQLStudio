const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const sampleAssignments = require('../data/sample-assignments');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');

    // Insert sample assignments
    await Assignment.insertMany(sampleAssignments);
    console.log('Inserted sample assignments');

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

setupDatabase();