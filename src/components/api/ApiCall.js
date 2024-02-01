import React, { useState,useEffect } from 'react';
import '../../styles/ChoreStyles.css';

const fetchApi = async () => {
    const dueDate = '2024-01-01';
    try {
      const response =  await fetch(`http://localhost:8080/holiday-data?dueDate=${dueDate}`);
      if (!response) {
        throw new Error('Failed to fetch data. Response is undefined.');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
 
      return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
  };
  const ApiCall = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
 useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
       setIsLoading(false);
     }
    };

    fetchData();
  }, []);

  if (isLoading) {
   return <p>Loading...</p>;
  }
  return (
    <div>
    {data && (
      <div>
        <h1>Data from API</h1>
        <p>{JSON.stringify(data, null, 2)}</p>
      </div>
    )}
  </div>)
};
export default ApiCall;