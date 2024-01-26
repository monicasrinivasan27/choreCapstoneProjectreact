import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChoreStyles.css';
//import { useNavigate } from 'react-router-dom';
//import AssignChore from './AssignChore';

// Functional component to display a list of chores
const ChoresList = () => {
  // State to hold the list of chores
  const [chores, setChores] = useState([]);

  // useEffect hook to fetch the list of chores from the server when the component mounts
  useEffect(() => {
    const fetchChores = async () => {
      
        // Fetch the list of chores from the server
        const response = await fetch('http://localhost:8080/api/chores/list');
        const data = await response.json();

        // Update the state with the fetched chore data
        setChores(data);
     
    };

    // Call the fetchChores function
    fetchChores();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Function to handle chore deletion
  const handleDelete = async (choreId) => {
    
      // Send a DELETE request to the server to delete the selected chore
      const response = await fetch(`http://localhost:8080/api/chores/${choreId}`, {
        method: 'DELETE',
      });

      // Check if the deletion was successful
      if (response.ok) {
        console.log('Chore deleted successfully');
        // Reload the page to reflect the updated chore list
        window.location.reload();
      } else {
        console.error('Failed to delete chore');
      }
    
  };

  
  return (
    <div>
      <div>
        <h1>List of Chores</h1>

        {/* Display the list of chores */}
        <ul className="chore-container">
          {chores && chores.map((chore) => (
            <div className="chore-item" key={chore.choreId}>
              <div className="chore-details">
                <strong>Name:</strong> {chore.name}<br />
                <strong>Description:</strong> {chore.description}<br />

                <div>
                  {/* Display the chore image if available */}
                  {chore.image && (
                    <div>
                      <img src={`${chore.image}`} alt={chore.name} /> <br />
                    </div>
                  )}
                </div>
              </div>

              <div className="button-container">
                {/* Link to edit chore page */}
                <Link to={`/api/chores/edit/${chore.choreId}`} className="button">
                  Edit
                </Link>

                {/* Button to delete the chore */}
                <button className="button" onClick={() => handleDelete(chore.choreId)}>
                  Delete
                </button>

              {/* < AssignChore choreId={chore.choreId} handleAssignChore={handleAssignChore} /> */}
              </div>
            </div>
          ))}
        </ul>
      </div>

      {/* Link to navigate to the chore creation page */}
      <p>
        <Link to="/api/chores/add" className="button">
          Create
        </Link>
      </p>
    </div>
  );
};

// Export the component for use in other parts of the application
export default ChoresList;
