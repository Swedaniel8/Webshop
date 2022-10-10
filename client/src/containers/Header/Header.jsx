import React from 'react'

import { IoIosArrowForward } from 'react-icons/io'

import './Header.css'
const Header = () => {
  return (
    <div className='container__header'>
      
      <div className='header__info'>
        <h1>WELCOME TO WASA</h1>        
        <button>Next<IoIosArrowForward id="react-icon"/></button>
      </div>
    </div>
  )
}

export default Header