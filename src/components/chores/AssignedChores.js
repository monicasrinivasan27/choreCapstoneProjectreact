
import React, { useState, useEffect } from 'react';
import '../../styles/ChoreStyles.css';
import { request, getAuthToken } from '../../axios_helper';
import getUserIdFromAuthToken from '../../axios_helper';

const AssignedChoresPage = () => {
  const [assignedChores, setAssignedChores] = useState([]);

  const fetchAssignedChores = async () => {
    try {
      const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('get', `api/assignments/assigned-chores/${id}`);

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setAssignedChores(data);
      } else {
        console.error('Failed to fetch assigned chores');
      }
    } catch (error) {
      console.error('Failed to fetch assigned chores', error);
    }
  };

  useEffect(() => {
    fetchAssignedChores();
  }, []);

  const handleDeleteChore = async (choreId) => {
    try {
      const response = await request('delete', `api/assignments/assigned-chores/${choreId}`);

      if (response.status === 200) {
        fetchAssignedChores();
        console.log('Assigned chore deleted successfully');
      } else {
        console.error('Failed to delete assigned chore');
      }
    } catch (error) {
      console.error('Error during chore deletion:', error.message);
    }
  };

  const handleApproveChore = async (choreId) => {
    try {
      const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('post', `api/status/approve/${choreId}/${id}`);

      if (response.status === 200) {
        console.log('Chore approved successfully');

        setAssignedChores((prevAssignedChores) => {
          const updatedChores = prevAssignedChores.map((item) => ({
            ...item,
            chores: item.chores.map((chore) =>
              chore.choreId === choreId ? { ...chore, status: 'APPROVED' } : chore
            ),
          }));
          return updatedChores;
        });
      } else {
        console.error('Failed to approve chore');
      }
    } catch (error) {
      console.error('Failed to approve chore', error.message);
    }
  };

  return (
    <div>
      <h1>Assigned Chores</h1>
      {Array.isArray(assignedChores) &&
        assignedChores.map((item) => (
          <div key={item.kid.kidId}>
            <h2>{item.kid.name}'s Chores</h2>
            <div className="flex-container">
              <div className="flex-section">
                <h3>Assigned Chores</h3>
                {item.chores
                  .filter((chore) => chore.status === 'ASSIGNED')
                  .map((chore) => (
                    <div key={chore.choreId} className="chore-item">
                      <div>
                        <h4>{chore.name}</h4>
                        <p>{chore.description}</p>
                        <p>
                          <strong>Due Date:</strong> {new Date(...chore.dueDate).toISOString().split('T')[0]}
                        </p>
                        <p>
                          <strong>Value Type:</strong> {chore.valueType}
                        </p>
                        <p>
                          <strong>Value:</strong> {chore.value}
                        </p>
                        <p>
                          <strong>Status:</strong> {chore.status}
                        </p>
                        <button className='button' onClick={() => handleDeleteChore(chore.choreId)}>Delete</button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex-section">
                <h3>Waiting for Approval</h3>
                {item.chores
                  .filter((chore) => chore.status === 'COMPLETED')
                  .map((chore) => (
                    <div key={chore.choreId} className="chore-item">
                      <div>
                        <h4>{chore.name}</h4>
                        <p>{chore.description}</p>
                        <p>
                          <strong>Value Type:</strong> {chore.valueType}
                        </p>
                        <p>
                          <strong>Value:</strong> {chore.value}
                        </p>
                        <p>
                          <strong>Status:</strong> {chore.status}
                        </p>
                        {chore.status === 'COMPLETED' && (
                          <button type="submit" onClick={() => handleApproveChore(chore.choreId)}>Approve</button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex-section">
                <h3>Approved Chores</h3>
                {item.chores
                  .filter((chore) => chore.status === 'APPROVED')
                  .map((chore) => (
                    <div key={chore.choreId} className="chore-item">
                      <div>
                        <h4>{chore.name}</h4>
                        <p>{chore.description}</p>
                        <p>
                          <strong>Value Type:</strong> {chore.valueType}
                        </p>
                        <p>
                          <strong>Value:</strong> {chore.value}
                        </p>
                        <p>
                          <strong>Status:</strong> {chore.status}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AssignedChoresPage;
