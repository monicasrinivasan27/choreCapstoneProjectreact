import React, { useState, useEffect } from 'react';
import '../../styles/ChoreStyles.css';
import { useNavigate,Link } from 'react-router-dom';
import AssignChore from './AssignChore';
import { request,getAuthToken} from '../../axios_helper'; 
import getUserIdFromAuthToken from '../../axios_helper';


const ChoresList = () => {
 
  const navigate = useNavigate();

  // State to store the list of chores
  const [chores, setChores] = useState([]);

  
  

  // Function to handle chore assignment
  const handleAssignChore = async (id , choreId, selectedKid, dueDate, selectedValueType, selectedValue) => {
    try {


      // Format the due date to a string
      const formattedDueDate = dueDate.toISOString().split('T')[0];
      const url = `api/assignments/${id}/${choreId}/${selectedKid}?dueDate=${formattedDueDate}&valueType=${selectedValueType}&value=${selectedValue}`;

      // Send a POST request to assign the chore using axios
      const response = await request('post', url);

      // Check if the request was successful and navigate accordingly
      if (response.status === 200) {
        console.log('Chore assigned successfully');
        navigate(`/api/assignments/assigned-chores/${id}`);
      } else {
        console.error('Failed to assign chore');
      }
    } catch (error) {
      console.error('Error during chore assignment:', error.message);
    }
  };

  // Effect hook to fetch chores when the component mounts
  useEffect(() => {
    const fetchChores = async () => {
      try {
        
        const response = await request('get', 'api/chores/list');
        const data = response.data;
       
        setChores(data);
      } catch (error) {
        console.error('Error fetching chores:', error.message);
      }
    };

    // Call the fetchChores function
    fetchChores();
  }, []);

  // Function to handle chore deletion
  const handleDelete = async (choreId) => {
    try {
      // Send a DELETE request to delete the chore using axios
      const response = await request('delete', `api/chores/${choreId}`);

      // Check if the request was successful and reload the page
      if (response.status === 200) {
        console.log('Chore deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete chore');
      }
    } catch (error) {
      console.error('Error during chore deletion:', error.message);
    }
  };


  return (
    <div>
      <div>
        <h1>List of Chores</h1>

        {/* Display the list of chores */}
        <ul className="chore-container">
          {chores && chores.map && chores.map((chore) => (
            <div className="chore-item" key={chore.choreId}>
              <div className="chore-details">
                <strong>Name:</strong> {chore.name}<br />
                <strong>Description:</strong> {chore.description}<br />

                {/* Display chore image if available */}
                <div>
                  {chore.image && (
                    <div>
                      <img src={`${chore.image}`} alt={chore.name} /> <br />
                    </div>
                  )}
                </div>
              </div>

              {/* Container for buttons: Edit, Delete, Assign */}
              <div className="button-container">
                {/* Link to edit chore */}
                <Link to={`/api/chores/edit/${chore.choreId}`} className="button">
                  Edit
                </Link>

                {/* Button to delete chore */}
                <button className="button" onClick={() => handleDelete(chore.choreId)}>
                  Delete
                </button>

                {/* Component for assigning chore */}
                <AssignChore choreId={chore.choreId}  handleAssignChore={handleAssignChore} />

              </div>
            </div>
          ))}
        </ul>
      </div>

      {/* Link to add a new chore */}
      <p>
        <Link to="/api/chores/add" className="button">
          Create
        </Link>
      </p>
    </div>
  );
};

// Export the ChoresList component
export default ChoresList;
