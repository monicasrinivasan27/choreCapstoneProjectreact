
import React, { useState, useEffect } from 'react';
import '../../styles/ChoreStyles.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { request,getAuthToken,} from '../../axios_helper'; 
import getUserIdFromAuthToken from '../../axios_helper';


const UpdateChore = () => {
  const navigate = useNavigate();
  const { choreId } = useParams();

  const [chore, setChore] = useState({
    name: '',
    description: '',
    image: '',
  });

  // Array of images for chore selection

  const imageOptions = [
    { value: 'clean_bathroom.jpg', label: 'Clean Bathroom Image' },
    { value: 'clean_dishes.jpg', label: 'Clean Dishes Image' },
    { value: 'clean_floors.jpg', label: 'Clean Floors Image' },
    { value: 'clean_patio.jpg', label: 'Clean Patio Image' },
    { value: 'fold_clothes.jpg', label: 'Fold Clothes Image' },
    { value: 'laundry.jpg', label: 'Laundry Image' },
    { value: 'make_bed.png', label: 'Makebed Image' },
    { value: 'vaccum.jpg', label: 'Vaccum Image' },
    { value: 'trash.jpg', label: 'Trash Image' },
    { value: 'water_plants.jpg', label: 'Water Plants Image' },
    { value: 'clean_windows.jpg', label: 'clean windows Image' },
    { value: 'clean_vanity.jpg', label: 'clean vanity Image' },
  ];


  useEffect(() => {
    const id = getUserIdFromAuthToken(getAuthToken());
    if (choreId) {
      const fetchChoreDetails = async () => {
       
          const response = await request('get', `api/chores/edit/${choreId}?id=${id}`);
          if (response.status === 200) {
            const result = response.data;
            setChore(result);
          } else {
            console.error('Failed to fetch chore details');
          }
       
      };

      fetchChoreDetails();
    }
  }, [choreId]);

  const handleSubmit = async (e) => {
    const id = getUserIdFromAuthToken(getAuthToken());
    e.preventDefault();

    
      const response = await request('put', `api/chores/edit/${choreId}?id=${id}`, {
         ...chore, image: chore.image ,
      });

      if (response.status === 200) {
        console.log('Chore updated successfully');
        navigate('/api/chores/list');
      } else {
        console.error('Failed to update chore');
      }
    };

  const handleImageChange = (event) => {
    const selectedImage = event.target.value;
    setChore({ ...chore, image: selectedImage });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setChore({ ...chore, [name]: value });
  };

  const handleImageSource = () => {
    if (choreId && !chore.image.includes('/images/')) {
      return `/images/${chore.image}`;
    }
    return chore.image;
  };


  return (
    <div>
      <h1>Edit Chore</h1>

      <form class='group' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={chore.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            value={chore.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Select Image:</label>
          <select
            id="image"
            name="image"
            value={chore.image}
            onChange={handleImageChange}
          >
            <option value="" disabled>
              Select an image
            </option>
            {imageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          {chore.image && (
            <img
              src={handleImageSource()}
              alt={chore.name}
            />
          )}
        </div>
        <div>
          <input className="button" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdateChore;
