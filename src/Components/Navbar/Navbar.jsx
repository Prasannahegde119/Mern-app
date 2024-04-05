import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.avif'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='containor'>
      <img src={logo}   alt='logo' className='logo'></img>
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Booking</li>
        <li><Link to='/contact' className='custom-button'>Contact Us</Link></li>

        <li>Home</li>
      </ul>
    </nav>
  )
}

export default Navbar
