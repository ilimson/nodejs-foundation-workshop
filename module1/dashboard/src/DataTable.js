import React from "react";

function DataTable({data}) {
  return (
    <table>
      {console.log({data})}
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
        {data.length > 0 ? (
          <>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.rank}</td>
                <td>{item.country}</td>
                <td>{item.Score}</td>
              </tr>
            ))}
          </>
        ) : (
          <tr>
            <td>No available data</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default DataTable;
