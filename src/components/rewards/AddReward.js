import RewardManagement from './RewardManagement';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { containerStyles } from './RewardStyles';
import {inputStyles} from './RewardStyles';

const AddReward = () => {
  let navigate = useNavigate();

  const [reward, setReward] = useState({
    name: '',
    description: '',
    points: '',
  });

  const { name, description, points } = reward;

  const onInputChange = (e) => {
    setReward({ ...reward, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log("reward : ",reward)
    await axios.post("http://localhost:8080/api/rewards/add", reward);
    navigate('/allRewards'); 

  };

  return (
    <div className="container" style={containerStyles}>
      <div className="body">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Add Reward</h2>
  
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Reward Name
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter reward name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                  style={inputStyles} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter reward description"
                  name="description"
                  value={description}
                  onChange={(e) => onInputChange(e)}
                  style={inputStyles}
                  
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Points" className="form-label">
                  Points
                </label>
                <input
                  type={"number"}
                  className="form-control"
                  placeholder="Enter reward points"
                  name="points"
                  value={points}
                  onChange={(e) => onInputChange(e)}
                  style={inputStyles}
                />
              </div>
  
              <button type="submit" className="btn btn-outline-primary">
                Save
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/api/rewards/list">
                Discard
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

  export default AddReward;