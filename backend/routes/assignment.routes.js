const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const connectMongoDB = require('../db/mongo');

// Connect to MongoDB
connectMongoDB();

// Get all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find().select('title difficulty description');
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Get specific assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
});

module.exports = router;