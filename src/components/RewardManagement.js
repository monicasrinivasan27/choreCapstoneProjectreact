import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

const RewardManagement = () => {

  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
     // console.log("calling set rewards")
      await axios.get('http://localhost:8080/api/rewards/list')
.then(function (response) {
  setRewards(response.data);
  console.log("rewards : ",rewards)
})
.catch(function (error) {
  console.log(error);
})
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const navigateToAddRewards = () => {
    navigate('/addRewards');
  };
 
  

  const handleDelete = (id) =>{
    console.log("calling hanfle delete : ",id)
    axios.delete("http://localhost:8080/api/rewards/"+id).then((response)=>{
      console.log("delete response : ",response)
      fetchData();
    }).catch((error)=>{
      console.log("Error while deleting reward : ",error)
    });

    
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
      
    <div className='container'>
      <h2 className='text-center'>List of Rewards</h2>
      <button className='btn btn-primary mb-2' onClick={()=>{navigateToAddRewards()}}>Add Rewards</button>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Points</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {rewards.length > 0 ? (
            <>
              {rewards.map(reward => (
                <tr>
                <td> {reward.id}</td>
                  <td> {reward.name}</td>
                  <td>{reward.description}</td>
                  <td>{reward.points}</td>
                  <td>
                  {/* <button onClick={() => navigateToEditRewards(reward.id)}>Edit</button> */}
                  <button>Edit</button>
                  <button onClick= {()=>{handleDelete(reward.id)}}>Delete</button>
                  </td>
                </tr>
              ))}
              </>
          ) : (
            <p>No data available</p>
          )}
        </tbody>
      </table>
    </div>
    )}
    </div>
  );
};

export default RewardManagement;
