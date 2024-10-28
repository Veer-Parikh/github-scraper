import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Output = () => {
  const { username } = useParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, make the POST request
        await axios.post(`http://localhost:3000/scrape/${username}`);
        
        // Then, make the GET request to retrieve data
        const response = await axios.get(`http://localhost:3000/get/${username}`);
        setResponseData(response.data); // Store the response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]); // Add username as a dependency if it might change

  return (
    <div>
      <h2>Username: {username}</h2>
      <div>
        {responseData ? (
          <pre>{JSON.stringify(responseData, null, 2)}</pre> // Format and display data
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Output;