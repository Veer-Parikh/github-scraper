import React from 'react';

const Card = ({ name, description, language, topics, url, lastUpdated }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{name}</h3>
      <p style={styles.description}>{description || "No description provided."}</p>
      <p style={styles.language}>Language: {language || "N/A"}</p>
      <div style={styles.topics}>
        {topics.length > 0 ? topics.map((topic, index) => (
          <span key={index} style={styles.topic}>{topic}</span>
        )) : <span style={styles.topic}>No topics available</span>}
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" style={styles.link}>View on GitHub</a>
      <p style={styles.lastUpdated}>Last updated: {new Date(lastUpdated).toLocaleDateString()}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    maxWidth: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  description: {
    color: '#555',
    fontSize: '14px',
  },
  language: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  topics: {
    marginTop: '8px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  topic: {
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    padding: '4px 8px',
    margin: '4px',
    fontSize: '12px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    marginTop: '8px',
    display: 'block',
  },
  lastUpdated: {
    fontSize: '12px',
    color: '#888',
    marginTop: '8px',
  },
};

export default Card;
