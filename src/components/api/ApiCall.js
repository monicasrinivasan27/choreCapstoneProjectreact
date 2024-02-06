import React, { useState, useEffect } from 'react';
import '../../styles/ApiStyles.css';
//import axios from 'axios';
const dueDate = '2024-07-04';

const fetchApi = async () => {

  try {
    const response = await fetch(`http://localhost:8080/holiday-data?dueDate=${dueDate}`);
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
  //  const [data, setData] = useState(Boolean);
  const [isLoading, setIsLoading] = useState(true);
  const [box, setBox] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi();
        if (result) {
          console.log("Inside");
          publicHolidayIns();
          setBox(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const publicHolidayIns = async () => {
      try {
        const holidayData = {
          holidayDate: dueDate.toString(), // Add other properties as needed
        };
        // console.log("holidayData"+JSON.stringify(holidayData));
        const response = await fetch('http://localhost:8080/holiday-insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(holidayData),
        });
        //   const responseData = await response.json();
        //  console.log('Response from Spring Boot:', responseData);
      } catch (error) {
        console.error('Error making the request:', error);
      }
    };



    fetchData();

  }, []);

  const closeBox = () => {
    setBox(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {box && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>{dueDate} is a public holiday!</p>
            <button onClick={closeBox}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );

};
export default ApiCall;