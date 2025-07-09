import React from 'react'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div>
        <h1>Find Your Perfect Rental</h1>
        <p>Discover amazing properties that feels like home</p>
        <Link to="/properties"><button>Browse Properties</button></Link>
        <Link to="/contact"><button>Contact Us</button></Link>
    </div>
  )
}

export default HeroSection