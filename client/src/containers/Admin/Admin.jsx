import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { AddItemForm, AdminNavbar, AdminItemCard, UpdateItemForm, RemoveItemForm } from '../../components/index';

// REDUX //
import { getItems } from '../../slices/apiReducer'
import { unwrapResult } from '@reduxjs/toolkit'

import './Admin.css'
const Admin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [productsInfo, setProductsInfo] = useState([])
  const [searchCat, setSearchCat] = useState({category:""})
  const [formState, setFormState] = useState({add:false,remove:false,update:false})
  const [catState, setCatState] = useState({items:false,orders:false})

  const handleChange = (e) => {
    //console.log("e.target: ",formData.number)
    const { name, value } = e.target
    setSearchCat(prevState => ({
        ...prevState,
        [name]: value
    }))
}

  const handleForms = (target) => {
    setFormState({add:false,remove:false,update:false})
    setFormState(prev => ({...prev,
      [target]:true
    }))
  }
  const handleCategories = (target) => {
    setFormState({add:false,remove:false,update:false})
    setCatState({items:false,orders:false})
    setCatState(prev => ({...prev,
      [target]:true
    }))
  }
  useEffect(()=>{
    dispatch(getItems())
      .then(unwrapResult)
      .then(res => {
        if(!res.err && res.success){            
          console.log("res.products: ",res.products)
          setProductsInfo(res.products)
        }
      })
  },[])


  return (
    <div className="container__admin">



      {/*  NAVBAR  */}
      <div className='admin__navbar'>
        <div className='admin__navbar__user'>
            <p>AdminUser</p>
            <BiLogOut id="react-icon" />
        </div>        
        <div className='admin__navbar__functions'>
            <button onClick={()=>handleCategories("items")}> Items </button>
            <button onClick={()=>handleCategories("orders")}> Orders </button>            
        </div>
      </div>



      {/*  ITEMS LIST  */}
      {catState.items && 
      <div className='admin__items'>

        <div className='admin__items__search'>
          <label htmlFor="getSearch">Search items by category</label>
          <select id="getSearch" onChange={handleChange} value={searchCat.category} name="category">
              <option value="default">Select an option</option>
              <option value="v45">V45 Amplifier</option>
              <option value="w110">W110 Amplifier</option>
              <option value="g10">G10 Multiplier</option>
              <option value="other">Other</option>
          </select>

          <input type="text" id="ftitle" placeholder="Title" onChange={handleChange} value={searchCat.title} name="title"></input>
          <input type="text" id="fid" placeholder="Id" onChange={handleChange} value={searchCat.id} name="id"></input>

          <button onClick={()=>handleForms("add")}>add new items</button>
        </div>

        <div className='admin__items__item'>
          {productsInfo.map((item,i) =>{
            return <AdminItemCard productsInfo={item} key={i}/>
          })}
        </div>
        

      </div>
      }

      {/*  FORMS FOR EDITING  */}
      <div className='admin__forms'>       
        {formState.add && 
        <AddItemForm />
        }                                                   
      </div>

      {/*  ORDERS LIST  */}
      {catState.orders && 
        <div className='admin__orders'>

        </div>
      }


      

    </div>
  )
}

export default Admin