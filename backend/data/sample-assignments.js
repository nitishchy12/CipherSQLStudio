// Sample assignments for CipherSQLStudio
// This data should be inserted into MongoDB

const sampleAssignments = [
  {
    title: "Basic SELECT Query",
    difficulty: "Easy",
    description: "Learn to select specific columns from a table",
    question: `Write a SQL query to select the first name and last name of all employees from the employees table.

Requirements:
- Select only first_name and last_name columns
- Return all rows from the table`,
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "first_name", dataType: "VARCHAR" },
          { columnName: "last_name", dataType: "VARCHAR" },
          { columnName: "email", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" },
          { columnName: "salary", dataType: "INTEGER" }
        ],
        rows: [
          { id: 1, first_name: "John", last_name: "Doe", email: "john.doe@company.com", department: "Engineering", salary: 75000 },
          { id: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@company.com", department: "Marketing", salary: 65000 },
          { id: 3, first_name: "Mike", last_name: "Johnson", email: "mike.johnson@company.com", department: "Engineering", salary: 80000 },
          { id: 4, first_name: "Sarah", last_name: "Wilson", email: "sarah.wilson@company.com", department: "HR", salary: 60000 },
          { id: 5, first_name: "David", last_name: "Brown", email: "david.brown@company.com", department: "Finance", salary: 70000 }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: [
        { first_name: "John", last_name: "Doe" },
        { first_name: "Jane", last_name: "Smith" },
        { first_name: "Mike", last_name: "Johnson" },
        { first_name: "Sarah", last_name: "Wilson" },
        { first_name: "David", last_name: "Brown" }
      ]
    }
  },
  {
    title: "WHERE Clause Filtering",
    difficulty: "Easy",
    description: "Filter data using WHERE conditions",
    question: `Write a SQL query to find all employees who work in the 'Engineering' department.

Requirements:
- Select all columns
- Filter by department = 'Engineering'
- Order by salary in descending order`,
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "first_name", dataType: "VARCHAR" },
          { columnName: "last_name", dataType: "VARCHAR" },
          { columnName: "email", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" },
          { columnName: "salary", dataType: "INTEGER" }
        ],
        rows: [
          { id: 1, first_name: "John", last_name: "Doe", email: "john.doe@company.com", department: "Engineering", salary: 75000 },
          { id: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@company.com", department: "Marketing", salary: 65000 },
          { id: 3, first_name: "Mike", last_name: "Johnson", email: "mike.johnson@company.com", department: "Engineering", salary: 80000 },
          { id: 4, first_name: "Sarah", last_name: "Wilson", email: "sarah.wilson@company.com", department: "HR", salary: 60000 },
          { id: 5, first_name: "David", last_name: "Brown", email: "david.brown@company.com", department: "Finance", salary: 70000 }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: [
        { id: 3, first_name: "Mike", last_name: "Johnson", email: "mike.johnson@company.com", department: "Engineering", salary: 80000 },
        { id: 1, first_name: "John", last_name: "Doe", email: "john.doe@company.com", department: "Engineering", salary: 75000 }
      ]
    }
  },
  {
    title: "JOIN Two Tables",
    difficulty: "Medium",
    description: "Combine data from multiple tables using JOIN",
    question: `Write a SQL query to get employee names along with their project names.

Requirements:
- Join employees and projects tables
- Select employee first_name, last_name, and project name
- Only show employees who are assigned to projects`,
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "first_name", dataType: "VARCHAR" },
          { columnName: "last_name", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" }
        ],
        rows: [
          { id: 1, first_name: "John", last_name: "Doe", department: "Engineering" },
          { id: 2, first_name: "Jane", last_name: "Smith", department: "Marketing" },
          { id: 3, first_name: "Mike", last_name: "Johnson", department: "Engineering" }
        ]
      },
      {
        tableName: "projects",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "name", dataType: "VARCHAR" },
          { columnName: "employee_id", dataType: "INTEGER" }
        ],
        rows: [
          { id: 1, name: "Website Redesign", employee_id: 1 },
          { id: 2, name: "Mobile App", employee_id: 3 },
          { id: 3, name: "Database Migration", employee_id: 1 }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: [
        { first_name: "John", last_name: "Doe", name: "Website Redesign" },
        { first_name: "John", last_name: "Doe", name: "Database Migration" },
        { first_name: "Mike", last_name: "Johnson", name: "Mobile App" }
      ]
    }
  },
  {
    title: "GROUP BY and COUNT",
    difficulty: "Medium",
    description: "Aggregate data using GROUP BY and COUNT functions",
    question: `Write a SQL query to count how many employees are in each department.

Requirements:
- Group by department
- Count the number of employees in each department
- Order by count in descending order`,
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "first_name", dataType: "VARCHAR" },
          { columnName: "last_name", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" }
        ],
        rows: [
          { id: 1, first_name: "John", last_name: "Doe", department: "Engineering" },
          { id: 2, first_name: "Jane", last_name: "Smith", department: "Marketing" },
          { id: 3, first_name: "Mike", last_name: "Johnson", department: "Engineering" },
          { id: 4, first_name: "Sarah", last_name: "Wilson", department: "HR" },
          { id: 5, first_name: "David", last_name: "Brown", department: "Engineering" },
          { id: 6, first_name: "Lisa", last_name: "Davis", department: "Marketing" }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: [
        { department: "Engineering", count: 3 },
        { department: "Marketing", count: 2 },
        { department: "HR", count: 1 }
      ]
    }
  },
  {
    title: "Subquery Challenge",
    difficulty: "Hard",
    description: "Use subqueries to find complex relationships",
    question: `Write a SQL query to find employees who earn more than the average salary in their department.

Requirements:
- Use a subquery to calculate average salary per department
- Compare each employee's salary with their department average
- Select employee name, department, salary, and department average`,
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INTEGER" },
          { columnName: "first_name", dataType: "VARCHAR" },
          { columnName: "last_name", dataType: "VARCHAR" },
          { columnName: "department", dataType: "VARCHAR" },
          { columnName: "salary", dataType: "INTEGER" }
        ],
        rows: [
          { id: 1, first_name: "John", last_name: "Doe", department: "Engineering", salary: 75000 },
          { id: 2, first_name: "Jane", last_name: "Smith", department: "Marketing", salary: 65000 },
          { id: 3, first_name: "Mike", last_name: "Johnson", department: "Engineering", salary: 90000 },
          { id: 4, first_name: "Sarah", last_name: "Wilson", department: "HR", salary: 60000 },
          { id: 5, first_name: "David", last_name: "Brown", department: "Engineering", salary: 70000 },
          { id: 6, first_name: "Lisa", last_name: "Davis", department: "Marketing", salary: 70000 }
        ]
      }
    ],
    expectedOutput: {
      type: "table",
      value: [
        { first_name: "Mike", last_name: "Johnson", department: "Engineering", salary: 90000 },
        { first_name: "Lisa", last_name: "Davis", department: "Marketing", salary: 70000 }
      ]
    }
  }
];

module.exports = sampleAssignments;