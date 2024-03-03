import React, { useState, useEffect } from 'react';
import '../../styles/ChoreStyles.css';
import { useNavigate,Link } from 'react-router-dom';
import AssignChore from './ChoreAssignmentProcess';
import { request,getAuthToken,getUserIdFromAuthToken} from '../../axios_helper'; 
//import getUserIdFromAuthToken from '../../axios_helper';

import Navbar from '../Navbar';


const ChoresList = () => {
 
  const navigate = useNavigate();

  // State to store the list of chores
  const [chores, setChores] = useState([]);
  const id = getUserIdFromAuthToken(getAuthToken());

  
  

  // Function to handle chore assignment
  const handleAssignChore = async (id , choreId, selectedKid, dueDate, selectedValueType, selectedValue) => {
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
    
  };

  // Effect hook to fetch chores when the component mounts
  useEffect(() => {
    const fetchChores = async () => {
      const response = await request('get', `api/chores/list?id=${id}`);
        const data = response.data;
        setChores(data);
     
    };

    fetchChores();
  }, [id]);

  // Function to handle chore deletion
  const handleDelete = async (choreId) => {
   
      // Send a DELETE request to delete the chore using axios
      const response = await request('delete', `api/chores/${choreId}`);

      // Check if the request was successful and reload the page
      if (response.status === 200) {
        console.log('Chore deleted successfully');
        window.location.reload();
      } else {
        console.error('Failed to delete chore');
      }
    
  };


  return (
    <div >

      <Navbar/>
          
      <div>
        {/* Display the list of chores */}
        <ul className="chore-container">
          {chores && chores.map && chores.map((chore) => (
            <div className="chore-item" key={chore.choreId}>
              <div className="chore-details">
                <strong> {chore.name}</strong> <br />
                 {chore.description}<br />

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
    </div>
  );
};

// Export the ChoresList component
export default ChoresList;
