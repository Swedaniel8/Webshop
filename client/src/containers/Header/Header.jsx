import React from 'react'
import {  BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

import './Header.css'
const Header = () => {
  return (
    <div className='container__header'>
      
      <div className='header__info'>
        <h1>WELCOME TO WASA</h1>        
        <button>Next<IoIosArrowForward id="react-icon"/></button>
        <Link to={`completion/redirect_status=failed`}></Link>
      </div>
    </div>
  )
}

export default Header