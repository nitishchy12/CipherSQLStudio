require('dotenv').config();
const express = require('express');
const cors = require('cors');

const assignmentRoutes = require('./routes/assignment.routes');
const queryRoutes = require('./routes/query.routes');
const hintRoutes = require('./routes/hint.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/assignments', assignmentRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/hint', hintRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'CipherSQLStudio Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});