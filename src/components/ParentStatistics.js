import React, { useState, useEffect } from 'react';
import { request,getAuthToken } from '../axios_helper'; 
import '../styles/ParentDashboardStyles.css';
import getUserIdFromAuthToken from '../axios_helper';

const ParentStatistics = () => {
  const [dashboardData, setDashboardData] = useState([]);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
      const id = getUserIdFromAuthToken(getAuthToken());
      const response = await request('GET', `/api/parent-dashboard/statistics?id=${id}`);
      setDashboardData(response.data);
    };

  return (
    <div>
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
