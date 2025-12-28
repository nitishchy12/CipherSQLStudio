import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/assignment.scss';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('/api/assignments');
      setAssignments(response.data);
    } catch (err) {
      setError('Failed to load assignments. Please try again.');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'assignment-card__difficulty--easy';
      case 'medium':
        return 'assignment-card__difficulty--medium';
      case 'hard':
        return 'assignment-card__difficulty--hard';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="assignment-list">
        <div className="loading">Loading assignments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assignment-list">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="assignment-list">
      <div className="assignment-list__header">
        <h2 className="assignment-list__title">SQL Practice Assignments</h2>
        <p className="assignment-list__subtitle">
          Choose an assignment to start practicing SQL queries
        </p>
      </div>

      <div className="assignment-grid">
        {assignments.map((assignment) => (
          <div key={assignment._id} className="assignment-card">
            <div className="assignment-card__header">
              <h3 className="assignment-card__title">{assignment.title}</h3>
              <span 
                className={`assignment-card__difficulty ${getDifficultyClass(assignment.difficulty)}`}
              >
                {assignment.difficulty}
              </span>
            </div>
            
            <p className="assignment-card__description">
              {assignment.description}
            </p>
            
            <div className="assignment-card__footer">
              <Link 
                to={`/assignment/${assignment._id}`}
                className="assignment-card__button"
              >
                Start Assignment
              </Link>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="no-assignments">
          <p>No assignments available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AssignmentList;