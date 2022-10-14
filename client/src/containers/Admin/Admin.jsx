import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BiLogOut, BiRefresh } from 'react-icons/bi'
import { AddItemForm, AdminNavbar, AdminItemCard, UpdateItemForm, RemoveItemForm, InvoiceCard } from '../../components/index';

// REDUX //
import { getItems, getOrders } from '../../slices/apiReducer'
import { unwrapResult } from '@reduxjs/toolkit'

import './Admin.css'
const Admin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [productsInfo, setProductsInfo] = useState([])
  const [ordersInfo, setOrdersInfo] = useState([])
  const [refreshFetchItems, setRefreshFetchItems] = useState(false)
  const [refreshFetchOrders, setRefreshFetchOrders] = useState(false)

  const [orderDetails, setOrderDetails] = useState()
  
  const [searchItems, setSearchItems] = useState({category:""})
  const [searchOrder, setSearchOrder] = useState({category:""},{id:""},{date:""},{title:""})
  const [formState, setFormState] = useState({add:false,remove:false,update:false})
  const [catState, setCatState] = useState({items:false,orders:false})

  const handleChangeItems = (e) => {
    //console.log("e.target: ",formData.number)
    const { name, value } = e.target
    setSearchItems(prevState => ({
        ...prevState,
        [name]: value
    }))
  }
  const handleChangeOrders = (e) => {
    //console.log("e.target: ",formData.number)
    const { name, value } = e.target
    setSearchOrder(prevState => ({
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

  // GET ITEMS
  useEffect(()=>{
    dispatch(getItems())
      .then(unwrapResult)
      .then(res => {
        if(!res.err && res.success){            
          console.log("res.products: ",res.products)
          setProductsInfo(res.products)
        }
      })
  },[refreshFetchItems])


  // GET ORDERS
  useEffect(()=>{
    dispatch(getOrders())
      .then(unwrapResult)
      .then(res => {
        if(!res.err && res.success){            
          console.log("res.orders: ",res.orders)
          setOrdersInfo(res.orders)
        }
      })
  },[refreshFetchOrders])


  //TODO Make admin__items && admin__forms,  and admin__orders each a seperate page (2 pages) then import them here
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
          <select id="getSearch" onChange={handleChangeItems} value={searchItems.category} name="category">
              <option value="default">Select an option</option>
              <option value="v45">V45 Amplifier</option>
              <option value="w110">W110 Amplifier</option>
              <option value="g10">G10 Multiplier</option>
              <option value="other">Other</option>
          </select>

          <input type="text" id="ftitle" placeholder="Title" onChange={handleChangeItems} value={searchItems.title} name="title"></input>
          <input type="text" id="fid" placeholder="Id" onChange={handleChangeItems} value={searchItems.id} name="id"></input>

          <button onClick={()=>handleForms("add")}>add new items</button>
          <BiRefresh onClick={()=>setRefreshFetchItems(!refreshFetchItems)} />
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

          <div className='admin__orders-leftcol'> 
            <div className='admin__orders__search'>
              <label htmlFor="getSearchOrders">Search orders by category</label>
              <select id="getSearchOrders" onChange={handleChangeItems} value={searchOrder.category} name="orders">
                  <option value="default">Select an option</option>
                  <option value="v45">V45 Amplifier</option>
                  <option value="w110">W110 Amplifier</option>
                  <option value="g10">G10 Multiplier</option>
                  <option value="other">Other</option>
              </select>

              <input type="text" id="ftitle" placeholder="Title" onChange={handleChangeOrders} value={searchOrder.title} name="title"></input>
              <input type="text" id="fid" placeholder="Id" onChange={handleChangeOrders} value={searchOrder.id} name="id"></input>

              <button onClick={()=>null}>null</button>
              <BiRefresh onClick={()=>null} />
            </div>


            <div className='admin__orders__order'>
              {ordersInfo.map((item,i) =>{
                if(item.status ==="complete") return <div onClick={()=>{setOrderDetails(item)}}><InvoiceCard ordersInfo={item} key={i}/></div>
              })}
            </div>
          </div>

          <div className='admin__orders-rightcol'>
          {orderDetails &&
            orderDetails.line_items.data.map((item,i)=>{
              
              return <div className='admin__orders__orderdetail' key={i}>
                        <p>{item.description}</p>
                        <p>id: {item.id}</p>
                        <p>Sub amount: {item.amount_total / 100} SEK</p>
                        <p>Qty: {item.quantity}</p>
                    </div>
            })
            
            }
          </div>

        </div>
      }


      

    </div>
  )
}

export default Admin