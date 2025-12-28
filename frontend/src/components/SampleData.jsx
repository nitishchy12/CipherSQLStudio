import React, { useState } from 'react';

const SampleData = ({ tables }) => {
  const [activeTable, setActiveTable] = useState(0);

  if (!tables || tables.length === 0) {
    return null;
  }

  return (
    <div className="sample-data">
      <h3 className="sample-data__title">Sample Data</h3>
      
      {tables.length > 1 && (
        <div className="sample-data__tabs">
          {tables.map((table, index) => (
            <button
              key={index}
              onClick={() => setActiveTable(index)}
              className={`sample-data__tab ${
                activeTable === index ? 'sample-data__tab--active' : ''
              }`}
            >
              {table.tableName}
            </button>
          ))}
        </div>
      )}

      <div className="sample-data__content">
        {tables[activeTable] && (
          <div className="table-info">
            <h4 className="table-info__name">
              Table: {tables[activeTable].tableName}
            </h4>
            
            <div className="table-schema">
              <h5 className="table-schema__title">Schema:</h5>
              <div className="table-schema__columns">
                {tables[activeTable].columns?.map((column, index) => (
                  <div key={index} className="column-info">
                    <span className="column-info__name">{column.columnName}</span>
                    <span className="column-info__type">({column.dataType})</span>
                  </div>
                ))}
              </div>
            </div>

            {tables[activeTable].rows && tables[activeTable].rows.length > 0 && (
              <div className="sample-rows">
                <h5 className="sample-rows__title">Sample Rows:</h5>
                <div className="sample-table-container">
                  <table className="sample-table">
                    <thead>
                      <tr>
                        {tables[activeTable].columns?.map((column, index) => (
                          <th key={index} className="sample-table__header">
                            {column.columnName}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tables[activeTable].rows.slice(0, 5).map((row, rowIndex) => (
                        <tr key={rowIndex} className="sample-table__row">
                          {tables[activeTable].columns?.map((column, colIndex) => (
                            <td key={colIndex} className="sample-table__cell">
                              {row[column.columnName] !== null && row[column.columnName] !== undefined
                                ? String(row[column.columnName])
                                : 'NULL'
                              }
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {tables[activeTable].rows.length > 5 && (
                  <p className="sample-rows__note">
                    Showing first 5 rows of {tables[activeTable].rows.length} total rows
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleData;