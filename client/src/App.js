import React from 'react'

import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Navbar, Footer,AddItemForm, AdminNavbar, RemoveItemForm, UpdateItemForm, ShowItemForm } from './components/index'
import { Header,About, Main, Checkout, Completion, Admin, Failed} from './containers/index'
import './App.css';


const App = () => {
  return (
    
    <Router>      
      <Routes>      
        <Route path="/" element={<Main />} />       
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/completion' element={<Completion />} />                            
        <Route path='/admin/*' element={<Admin />} />                      
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
