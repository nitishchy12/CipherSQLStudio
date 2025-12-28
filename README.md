# CipherSQLStudio

CipherSQLStudio is a simple SQL practice platform where users can write and execute SQL queries on sample data. 

This project was built as part of the CipherSchools Full Stack Internship assignment.

## What this project does

- Shows a list of SQL practice assignments
- Allows users to write SQL queries in a code editor
- Executes queries and displays results
- Provides helpful hints without revealing full answers

## Tech stack

- **Frontend:** React with vanilla SCSS (mobile-first)
- **Backend:** Node.js with Express
- **Databases:** 
  - MongoDB for storing assignments
  - PostgreSQL for executing SQL queries
- **SQL Editor:** Monaco Editor
- **Hint system:** LLM-based API

## Why these technologies

- PostgreSQL supports schema isolation, which helps safely run user queries
- MongoDB works well for flexible assignment data
- React is comfortable for building interactive UIs
- SCSS was required by the assignment and used with a mobile-first approach

## How it works

1. SQL assignments are stored in MongoDB
2. User writes a query in the editor
3. Backend validates the query (only SELECT allowed)
4. Query runs inside a temporary PostgreSQL schema
5. Results are returned and displayed
6. Hints guide users without giving full solutions

## Setup instructions

### Requirements
- Node.js
- PostgreSQL (running locally)
- MongoDB (local or Atlas)
- API key for hint generation (optional)

### Installation

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Environment setup
```bash
cd backend
cp .env.example .env
```
Update `.env` with your database credentials and API key.

### Database setup

**PostgreSQL:**
```bash
createdb ciphersqlstudio
psql -d ciphersqlstudio -f scripts/setup-postgres.sql
```
Ensure the PostgreSQL user has required permissions.

**MongoDB:**
```bash
cd backend
npm run setup-local
```
This inserts sample SQL assignments into MongoDB.

### Running the application

```bash
# backend
cd backend
npm run dev

# frontend (new terminal)
cd frontend
npm start
```

Open http://localhost:3000 in the browser.

## Security considerations

- Only SELECT queries are allowed
- Destructive SQL keywords are blocked
- Each query runs in an isolated PostgreSQL schema
- Temporary schemas are cleaned automatically

## Mobile responsiveness

The UI works on mobile, tablet, and desktop screens using SCSS breakpoints.

## What I learned

This project helped me understand how to safely execute user-written SQL queries. The main challenge was isolating queries so users cannot affect shared data, which I solved using PostgreSQL schemas.

I also learned how to design hint prompts carefully so they guide users without revealing answers.

Built by Nitish Kumar Choudhary  
For CipherSchools Full Stack Internship




