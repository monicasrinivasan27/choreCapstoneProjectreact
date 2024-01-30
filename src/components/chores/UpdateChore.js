
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../styles/ChoreStyles.css';

// Functional component to edit a chore
const UpdateChore = () => {
  // Hook to manage navigation between pages
  const navigate = useNavigate();

  // Get the choreId parameter from the route
  const { choreId } = useParams();

  // State to hold the chore details
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


  // Fetch chore details from the server when the component mounts
  useEffect(() => {
    console.log('Chore ID:', choreId);

    // Check if choreId exists
    if (choreId) {
      const fetchChoreDetails = async () => {
        try {
          // Fetch chore details from the server based on choreId
          const response = await fetch(`http://localhost:8080/api/chores/edit/${choreId}`);
          console.log('Response:', response);

          // Check if the request was successful
          if (response.ok) {
            const result = await response.json();
            console.log('Chore Details:', result);
            // Update state with fetched chore details
            setChore(result);
          } else {
            console.error('Failed to fetch chore details');
          }
        } catch (error) {
          console.error('Error fetching chore details:', error.message);
        }
      };

      // Call the fetchChoreDetails function
      fetchChoreDetails();
    }
  }, [choreId]);

  // Function to handle form submission for updating the chore
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a PUT request to the server to update the chore
    const response = await fetch(`http://localhost:8080/api/chores/edit/${choreId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...chore, image: chore.image }),
    });

    // Check if the request was successful
    if (response.ok) {
      console.log('Chore updated successfully');
      // Navigate to the list of chores page after successful update
      navigate('/api/chores/list');
    } else {
      console.error('Failed to update chore');
    }
  };

  // Function to handle image selection
  function handleImageChange(event) {
    const selectedImage = event.target.value;
    setChore({ ...chore, image: selectedImage });
  }

  // Function to handle input field changes
  function handleChange(event) {
    const { name, value } = event.target;
    setChore({ ...chore, [name]: value });
  }

  // Function to determine the image source for display
  function handleImageSource() {
    if (choreId && !chore.image.includes('/images/')) {
      return `/images/${chore.image}`;
    }
    return chore.image;
  }

  // update form page

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
