import React from 'react'

import { Navbar } from '../../components/index'
import { Header,About, Products, News, Partners, Suppliers, Contact } from '../../containers/index'
import './Main.css'
const Main = () => {
  return (
    <div className='container__main'>
        <Navbar />
        <Header />
        <About />
        <News />
        <Suppliers />
        <Products />        
        <Partners />
        <Contact />
        
        
    </div>
  )
}

export default Main