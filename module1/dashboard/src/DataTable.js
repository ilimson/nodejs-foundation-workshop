import React from 'react';

function DataTable({ data }) {
  return (
    <table>
      <thead>
        <tr>
          {/* Assuming your data has keys 'id', 'name', 'value' etc. Adjust as per your dataset */}
          <th>Rank</th>
          <th>Country</th>
          <th>Score</th>
          {/* Add more <th> elements for other data keys */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.rank}</td>
            <td>{item.country}</td>
            <td>{item.Score}</td>
            {/* Add more <td> elements for other data values */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
