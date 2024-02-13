import React, { useState, useEffect } from 'react';
import { request,getAuthToken } from '../axios_helper'; 
import '../styles/ParentDashboardStyles.css';
import getUserIdFromAuthToken from '../axios_helper';

const ParentStatistics = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('GET', `/api/parent-dashboard/statistics/id=${id}`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div>
      <h1>Parent Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <div className='card-container'>
        {dashboardData.map(kid => (
          <div key={kid.kidId} className="card-item">
            <h2>{kid.kidName}</h2>
            <p>Total Points: {kid.totalPoints}</p>
            <p>Total Dollars: {kid.totalDollars}</p>
            <p>Total Assigned Chores: {kid.totalAssignedChores}</p>
            <p>Total Approved Chores: {kid.totalApprovedChores}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParentStatistics;
