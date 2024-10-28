import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import "../App.css"
const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      localStorage.setItem('searchQuery', searchValue); 
      
    }
  };

  return (
    <div className='home'>
      <div>
        <h1 className='children' style={{fontSize:"80px"}}>REPO-REVEAL</h1>
      </div>
      <h2 style={{fontFamily:"monospace"}}>Scrape your github public repositories by just entering your <a href="" style={{textDecoration:"none"}}>username</a></h2>
      <div className="wrap-input-18">
        <div className="search">
          <div>
            <input
            type="text"
            placeholder="Search . . ."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
