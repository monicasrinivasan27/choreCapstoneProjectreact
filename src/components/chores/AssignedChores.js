import React, { useState, useEffect } from 'react';

const AssignedChoresPage = () => {
  const [assignedChores, setAssignedChores] = useState([]);

  useEffect(() => {
    const fetchAssignedChores = async () => {

      const response = await fetch('http://localhost:8080/api/assignments/assigned-chores');

      if (response.ok) {
        const data = await response.json();
        setAssignedChores(data);
        console.log('Assigned Chores:', data);
      } else {
        console.error('Failed to fetch assigned chores');
      }

    };

    fetchAssignedChores();
  }, []);

  return (
    <div>
      <h1>Assigned Chores</h1>
      {Array.isArray(assignedChores) && assignedChores.map(item => (
        <div key={item.kid.kidId}>
          <h2>{item.kid.name}'s Chores</h2>
          <table>
            <thead>
              <tr>
                <th>Chore Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Value Type</th>
                <th>Value </th>
                <th>Status</th>

              </tr>
            </thead>
            <tbody>
              {item.chores.map(chore => (
                <tr key={chore.choreId}>
                  <td>{chore.name}</td>
                  <td>{chore.description}</td>
                  <td>{chore.dueDate}</td>
                  <td>{chore.valueType}</td>
                  <td>{chore.value}</td>
                  <td>{chore.status}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AssignedChoresPage;
