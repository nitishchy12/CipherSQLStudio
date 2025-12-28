import React from 'react';

const ResultTable = ({ result }) => {
  if (!result) return null;

  if (!result.success) {
    return (
      <div className="result-panel">
        <h4 className="result-panel__title">Query Result</h4>
        <div className="result-error">
          Error: {result.error}
        </div>
      </div>
    );
  }

  if (!result.data || result.data.length === 0) {
    return (
      <div className="result-panel">
        <h4 className="result-panel__title">Query Result</h4>
        <div className="result-empty">
          Query executed successfully but returned no rows.
        </div>
      </div>
    );
  }

  const columns = result.fields || Object.keys(result.data[0] || {});

  return (
    <div className="result-panel">
      <h4 className="result-panel__title">
        Query Result ({result.rowCount} rows)
      </h4>
      
      <div className="result-table-container">
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="result-table__header">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.data.map((row, rowIndex) => (
              <tr key={rowIndex} className="result-table__row">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="result-table__cell">
                    {row[column] !== null && row[column] !== undefined 
                      ? String(row[column]) 
                      : 'NULL'
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultTable;