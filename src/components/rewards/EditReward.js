import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { containerStyles } from './RewardStyles';
import {inputStyles} from './RewardStyles';


const EditReward = () => {
  const { rewardId } = useParams();
  const navigate = useNavigate();

  const [reward, setReward] = useState({
    name: '',
    description: '',
    points: '',
  });

  const { name, description, points } = reward;

  useEffect(() => {
    fetchRewardDetails();
  }, []);
  const fetchRewardDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/rewards/${rewardId}`);
      setReward(response.data);
    } catch (error) {
      console.error('Error fetching reward details:', error);
    }
  };
  

  const onInputChange = (e) => {
    setReward({ ...reward, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/rewards/edit/${rewardId}`, reward);
      navigate('/allRewards');
    } catch (error) {
      console.error('Axios request error:', error);
    }
  };
  

  return (
    <div className="container" style={containerStyles}>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Reward</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Reward Name
              </label>
              <input
                type="text"
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
                type="text"
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
                type="number"
                className="form-control"
                placeholder="Enter reward points"
                name="points"
                value={points}
                onChange={(e) => onInputChange(e)}
                style={inputStyles}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Upadte
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/allRewards">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditReward;