import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

// REACT-ICON //
import { BsFillCartFill } from 'react-icons/bs'
import { AiOutlineFullscreenExit, AiFillHome } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'

// REDUX //
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getCartInfo } from '../../slices/cart'

import { ProductCardSmall } from '../index'
import { Link } from "react-scroll";
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const productArray = [
    {id:"123123",title:"headphone1",info:"1this is a text what else whatever..",price:1337,img:"imgTest1", review:1,quantity:1},
    {id:"1232323",title:"headphone2",info:"2this is a text what else whatever..",price:2337,img:"imgTest2", review:3,quantity:2},
    {id:"454545",title:"headphone3",info:"3this is a text what else whatever..",price:3337 ,img:"imgTest3", review:5,quantity:10},
    {id:"9999991123",title:"headphone4",info:"4this is a text what else whatever..",price:337 ,img:"imgTest4", review:3,quantity:3},
    {id:"123", title: "XRM Headphones 1", info:"Great looking headphones with doolby x13 Virtual Sound",price:599, img:"", review:4,quantity:5}
  ]
  const dispatch = useDispatch()
  const selectorLength = useSelector(state => state.cart.length)
  const selectorCart = useSelector(state => state.cart.cartInfo)

  const [cartWindow, setCartWindow] = useState(false)
  const [numberItems, setNumberItems] = useState(0)
  const [cartArray, setCartArray] = useState([])

  const enterPopup = () =>{
    setCartWindow(true)
  }   
  const exitPopup = () =>{
    setCartWindow(false)
  }   
  useEffect(()=>{
    //console.log("selector: ",selectorLength)
    setNumberItems(selectorLength)
    setCartArray(selectorCart)
  },[selectorLength,selectorCart])
  const handleCheckout = async() => {

    let stripePromise;
    if(!stripePromise) {
      stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
    }
    const stripe = stripePromise
    var tempArray = cartArray
    delete tempArray.file
    console.log("tempArray: ",tempArray)
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tempArray),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className='component__navbar'>
      
      { /* NAVBAR */}
      <div className='navbar__home'>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__header"><AiFillHome id='react-icon'/></Link>
      </div>
      <div className='navbar__navigation'>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__about"><button onClick={null}>About</button></Link>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__news"><button onClick={null}>News</button></Link>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__suppliers"><button onClick={null}>Suppliers</button></Link>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__products"><button onClick={null}>Products</button></Link>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__partners"><button onClick={null}>Partners</button></Link>
        <Link className='linkBtn' horizontal={true} spy={true} smooth={true} to="container__contact"><button onClick={null}>Contact</button></Link>
        <div className='navbar__navigation-bar'></div>
      </div>
      <div className='navbar__cart' onClick={()=>enterPopup()}>
        <BsFillCartFill id="react-icon"/>
        {numberItems > 0 ?
        <div className='navbar__cart-items'>{numberItems}</div>
        : <div style={{display:"none"}}></div>}
      </div>


      {/* CART WINDOW */}
      {cartWindow ? 
      <div className='navbar__cartWindow' >
        
       { /*<AiOutlineFullscreenExit id="react-icon" onClick={exitPopup}/> */}
        <div className="navbar__cartWindow-cards">
          <h2><IoIosArrowBack id="react-icon-back" onClick={exitPopup}/> Your Cart: <p>({numberItems} items)</p></h2>
          {cartArray.length && cartArray.map((item,i)=>{
            return <ProductCardSmall productsInfo={item} key={i}/>
          })}
        </div>
        {cartArray.length ? 
        <button onClick={handleCheckout}>Check out</button>
        : <button className='disabled-btn'>Check out</button> }
      </div>
    : <div style={{display:"none"}}></div>}

    </div>
  )
}

export default Navbar