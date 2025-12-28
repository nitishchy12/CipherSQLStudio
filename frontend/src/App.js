import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssignmentList from './pages/AssignmentList';
import AssignmentAttempt from './pages/AssignmentAttempt';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">CipherSQLStudio</h1>
          <p className="app__subtitle">Practice SQL with Real-time Execution</p>
        </header>
        
        <main className="app__main">
          <Routes>
            <Route path="/" element={<AssignmentList />} />
            <Route path="/assignment/:id" element={<AssignmentAttempt />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;