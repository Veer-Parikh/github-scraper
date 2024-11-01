// Output.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const Output = () => {
  const { username } = useParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.post(`http://localhost:3000/scrape/${username}`);
        const response = await axios.get(`http://localhost:3000/get/${username}`);
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <h2>Repositories of {username}</h2>
      <div>
        {responseData ? (
          responseData.map(repo => (
            <Card
              key={repo.id}
              name={repo.name}
              description={repo.description}
              language={repo.language}
              topics={repo.topics}
              url={repo.url}
              lastUpdated={repo.lastUpdated}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Output;
