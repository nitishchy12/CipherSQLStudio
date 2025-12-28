# Data Flow Diagram

**Note:** A hand-drawn data flow diagram is included in the final submission as required.

## SQL Query Execution Flow

1. User writes a SQL query in the Monaco editor.
2. User clicks the **Execute** button.
3. Frontend sends a POST request to `/api/query/execute`.
4. Backend validates the query to allow only SELECT statements.
5. Backend sets up an isolated PostgreSQL schema for execution.
6. PostgreSQL runs the query on the sandboxed data.
7. Query results are returned to the backend.
8. Backend cleans up the temporary schema after execution.
9. Frontend displays the results in a tabular format.

## Hint Generation Flow

1. User clicks the **Get Hint** button.
2. Frontend sends the assignment question to `/api/hint/get-hint`.
3. Backend sends a carefully designed prompt to the LLM API.
4. LLM responds with a conceptual hint instead of a full solution.
5. Frontend shows the hint to the user.

## Security Considerations

- Only SELECT queries are allowed.
- Destructive SQL keywords (INSERT, UPDATE, DELETE, DROP, etc.) are blocked.
- Each query runs in an isolated schema.
- Temporary schemas are cleaned up automatically after execution.

This approach ensures safe SQL practice while using a real database.
