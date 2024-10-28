import React from 'react'
import image from "../download.png"
import "../App.css"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='name'>
            <img src={image} style={{height:"60px",width:"60px"}}></img>
            <h2>Github Scraper</h2>
        </div>
        <div className="veer">
            <h2>Made using <a href='https://cheerio.js.org/docs/intro' style={{textDecoration:"none"}}>Cheerio</a></h2>
        </div>
    </div>
    
  )
}

export default Navbar
