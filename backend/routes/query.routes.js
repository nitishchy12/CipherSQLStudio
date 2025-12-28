const express = require('express');
const router = express.Router();
const pool = require('../db/postgres');

// Execute SQL query
router.post('/execute', async (req, res) => {
  const { query, assignmentId } = req.body;

  // Basic validation - only allow SELECT queries
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required' });
  }

  const trimmedQuery = query.trim().toLowerCase();
  
  // Security check - only allow SELECT statements
  if (!trimmedQuery.startsWith('select')) {
    return res.status(400).json({ 
      error: 'Only SELECT queries are allowed for security reasons' 
    });
  }

  // Check for dangerous keywords
  const dangerousKeywords = ['insert', 'update', 'delete', 'drop', 'alter', 'create', 'truncate'];
  const hasUnsafeKeyword = dangerousKeywords.some(keyword => 
    trimmedQuery.includes(keyword)
  );

  if (hasUnsafeKeyword) {
    return res.status(400).json({ 
      error: 'Query contains unsafe operations. Only SELECT is allowed.' 
    });
  }

  try {
    // Create a workspace schema for this session
    const workspaceId = `workspace_${Date.now()}`;
    
    // Set search path to the workspace
    await pool.query(`CREATE SCHEMA IF NOT EXISTS ${workspaceId}`);
    await pool.query(`SET search_path TO ${workspaceId}, public`);

    // Execute the user query
    const result = await pool.query(query);
    
    // Clean up the workspace schema
    await pool.query(`DROP SCHEMA IF EXISTS ${workspaceId} CASCADE`);

    res.json({
      success: true,
      data: result.rows,
      rowCount: result.rowCount,
      fields: result.fields ? result.fields.map(field => field.name) : []
    });

  } catch (error) {
    console.error('Query execution error:', error);
    
    // Clean up on error
    try {
      const workspaceId = `workspace_${Date.now()}`;
      await pool.query(`DROP SCHEMA IF EXISTS ${workspaceId} CASCADE`);
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    res.status(400).json({
      success: false,
      error: error.message || 'Query execution failed'
    });
  }
});

module.exports = router;