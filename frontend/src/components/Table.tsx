import React, { useEffect, useState } from 'react';

function Table() {
  const [presidents, setPresidents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/presidents')
      .then(response => response.json())
      .then(data => setPresidents(data))
      .catch(error => console.error(error));

    console.log(presidents)
  }, []);

  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>President</th>
            <th>Number</th>
            <th>Born</th>
            <th>Died</th>
            <th>Birthplace</th>
            <th>Party</th>
            <th>Term Start</th>
            <th>Term End</th>
            <th>Tenure</th>
            <th>Vice President(s)</th>
          </tr>
        </thead>
        <tbody>
          {presidents.map((item, index) => (
            <tr key={index}>
              <td>{item.President}</td>
              <td>{item.Number}</td>
              <td>{item.Born}</td>
              <td>{item.Died}</td>
              <td>{item.Birthplace}</td>
              <td>{item.Party}</td>
              <td>{item['Term Start']}</td>
              <td>{item['Term End']}</td>
              <td>{item['Tenure Length']}</td>
              <td>{item['Vice President']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;