const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get hint for SQL query
router.post('/get-hint', async (req, res) => {
  const { question, userQuery, assignmentId } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required for hint generation' });
  }

  try {
    // Careful prompt engineering to avoid giving away solutions
    const prompt = `You are helping a student learn SQL. The student is working on this question: "${question}"

Their current query attempt: "${userQuery || 'No query yet'}"

Provide a helpful conceptual hint in plain English. DO NOT give the complete SQL solution. Instead:
- Explain what SQL concept they should think about
- Suggest which type of operation might be needed
- Give a general approach without specific syntax

Keep your hint under 50 words and educational, not a direct answer.`;

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a SQL tutor who gives hints, not solutions. Never provide complete SQL queries.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const hint = response.data.choices[0].message.content.trim();

    res.json({
      success: true,
      hint: hint
    });

  } catch (error) {
    console.error('Hint generation error:', error);
    
    // Fallback hint if API fails
    const fallbackHints = [
      "Think about which tables you need to join and what columns to select.",
      "Consider using GROUP BY if you need to aggregate data.",
      "Check if you need to filter rows with WHERE clause.",
      "Think about the relationship between the tables in your query.",
      "Consider what type of JOIN might be appropriate for this question."
    ];
    
    const randomHint = fallbackHints[Math.floor(Math.random() * fallbackHints.length)];
    
    res.json({
      success: true,
      hint: randomHint,
      fallback: true
    });
  }
});

module.exports = router;