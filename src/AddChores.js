
import React, { useState } from 'react';
import './ChoreStyles.css';
import { useNavigate } from 'react-router-dom';

const AddChore = () => {
  const navigate = useNavigate();
  const [chore, setChore] = useState({
    name: '',
    description: '',
    selectedImage: '',
    imagePath: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8080/api/chores/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...chore, image: chore.imagePath }),
    });

    if (response.ok) {
      console.log('Chore added successfully');
      setChore({
        name: '',
        description: '',
        selectedImage: '',
        imagePath: '',
      });
      navigate('/api/chores/list');
    } else {
      console.error('Failed to add chore');
    }
  };

  function handleImageChange(event) {
    const selectedImage = event.target.value;
    const imagePath = `/images/${selectedImage}`;
    setChore({ ...chore, selectedImage, imagePath });
  }


  function handleChange(event) {
    const { name, value } = event.target;
    setChore({ ...chore, [name]: value });
  }

  return (
    <div>
      <h1>Create a new Chore</h1>

      <form onSubmit={handleSubmit}>
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
          <label htmlFor="selectedImage">Select Image:</label>
          <select
            id="selectedImage"
            name="selectedImage"
            value={chore.selectedImage}
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
          {chore.selectedImage && (
            <img
              src={`/images/${chore.selectedImage}`}
              alt={chore.name}
            />
          )}
        </div>
        <div>
          <input className="button" type="submit" value="Create" />
        </div>
      </form>
    </div>
  );
};

export default AddChore;
