import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChoreStyles.css';
//import { useNavigate } from 'react-router-dom';
//import AssignChore from './AssignChore';

const ChoresList = () => {
  //   const navigate=useNavigate();

  const [chores, setChores] = useState([]);


  useEffect(() => {
    const fetchChores = async () => {

      const response = await fetch('http://localhost:8080/api/chores/list');
      const data = await response.json();
      setChores(data);

    };
    fetchChores();
  }, []);

  const handleDelete = async (choreId) => {
  
    const response = await fetch(`http://localhost:8080/api/chores/${choreId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Chore deleted successfully');
      window.location.reload();
    } else {
      console.error('Failed to delete chore');
    }

  };

  return (
    <div>
      <div>
        <h1>List of Chores</h1>

        <ul className="chore-container">
          {chores && chores.map((chore) => (
            <div className="chore-item" key={chore.choreId}>
              <div className="chore-details">
                <strong>Name:</strong> {chore.name}<br />
                <strong>Description:</strong> {chore.description}<br />

                <div>
                  {chore.image && (
                    <div>
                      <img src={`${chore.image}`} alt={chore.name} /> <br />
                    </div>
                  )}
                </div>
              </div>

              <div className="button-container">

                <Link to={`/api/chores/edit/${chore.choreId}`} className="button">
                  Edit
                </Link>

                <button className="button" onClick={() => handleDelete(chore.choreId)}>
                  Delete
                </button>

                {/* < AssignChore choreId={chore.choreId} handleAssignChore={handleAssignChore} /> */}
              </div>
            </div>
          ))}
        </ul>
      </div>
      <p>
        <Link to="/api/chores/add" className="button">
          Create
        </Link>
      </p>
    </div>
  );

};

export default ChoresList;
