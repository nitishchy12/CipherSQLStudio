import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import SQLEditor from '../components/SQLEditor';
import ResultTable from '../components/ResultTable';
import SampleData from '../components/SampleData';
import '../styles/assignment.scss';

const AssignmentAttempt = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [error, setError] = useState(null);
  const [hint, setHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [gettingHint, setGettingHint] = useState(false);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(`/api/assignments/${id}`);
      setAssignment(response.data);
    } catch (err) {
      setError('Failed to load assignment. Please try again.');
      console.error('Error fetching assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      setError('Please enter a SQL query');
      return;
    }

    setExecuting(true);
    setError(null);
    setQueryResult(null);

    try {
      const response = await axios.post('/api/query/execute', {
        query: sqlQuery,
        assignmentId: id
      });

      setQueryResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Query execution failed');
      console.error('Query execution error:', err);
    } finally {
      setExecuting(false);
    }
  };

  const getHint = async () => {
    setGettingHint(true);
    setError(null);

    try {
      const response = await axios.post('/api/hint/get-hint', {
        question: assignment?.question,
        userQuery: sqlQuery,
        assignmentId: id
      });

      setHint(response.data.hint);
      setShowHint(true);
    } catch (err) {
      setError('Failed to get hint. Please try again.');
      console.error('Hint generation error:', err);
    } finally {
      setGettingHint(false);
    }
  };

  if (loading) {
    return (
      <div className="assignment-attempt">
        <div className="loading">Loading assignment...</div>
      </div>
    );
  }

  if (error && !assignment) {
    return (
      <div className="assignment-attempt">
        <div className="error">{error}</div>
        <Link to="/" className="back-link">← Back to Assignments</Link>
      </div>
    );
  }

  return (
    <div className="assignment-attempt">
      <div className="assignment-attempt__header">
        <Link to="/" className="back-link">← Back to Assignments</Link>
        <h2 className="assignment-attempt__title">{assignment?.title}</h2>
        <span className={`difficulty difficulty--${assignment?.difficulty?.toLowerCase()}`}>
          {assignment?.difficulty}
        </span>
      </div>

      <div className="assignment-layout">
        <div className="assignment-layout__left">
          <div className="question-panel">
            <h3 className="question-panel__title">Question</h3>
            <div className="question-panel__content">
              {assignment?.question}
            </div>
          </div>

          {assignment?.sampleTables && (
            <SampleData tables={assignment.sampleTables} />
          )}
        </div>

        <div className="assignment-layout__right">
          <div className="editor-panel">
            <div className="editor-panel__header">
              <h3 className="editor-panel__title">SQL Editor</h3>
              <div className="editor-panel__actions">
                <button 
                  onClick={getHint}
                  disabled={gettingHint}
                  className="hint-button"
                >
                  {gettingHint ? 'Getting Hint...' : 'Get Hint'}
                </button>
                <button 
                  onClick={executeQuery}
                  disabled={executing}
                  className="execute-button"
                >
                  {executing ? 'Executing...' : 'Execute Query'}
                </button>
              </div>
            </div>

            <SQLEditor 
              value={sqlQuery}
              onChange={setSqlQuery}
            />

            {showHint && hint && (
              <div className="hint-panel">
                <h4 className="hint-panel__title">💡 Hint</h4>
                <p className="hint-panel__content">{hint}</p>
                <button 
                  onClick={() => setShowHint(false)}
                  className="hint-panel__close"
                >
                  ×
                </button>
              </div>
            )}

            {error && (
              <div className="error-panel">
                <strong>Error:</strong> {error}
              </div>
            )}

            {queryResult && (
              <ResultTable result={queryResult} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentAttempt;