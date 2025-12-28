const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  sampleTables: [{
    tableName: String,
    columns: [{
      columnName: String,
      dataType: String
    }],
    rows: [mongoose.Schema.Types.Mixed]
  }],
  expectedOutput: {
    type: {
      type: String,
      enum: ["table", "single_value", "column", "count"],
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);