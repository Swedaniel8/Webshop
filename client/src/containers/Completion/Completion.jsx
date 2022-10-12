import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBagCheckFill, BsFillCartXFill } from 'react-icons/bs';


import './Completion.css'
const Success = () => {
  const navigate = useNavigate()  
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get('redirect_status')

  useEffect(() => {
    localStorage.clear();
  }, []);



  if(product==="failed"){  
    return (
      <div className="success-wrapper container__completion">
        <div className="success">
          <p className="icon">
            <BsFillCartXFill style={{color:"red"}}/>
          </p>
          <h2>Something went wrong with the checkout</h2>
          <p className="email-msg">Please redo it.</p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </p>
          <div onClick={()=>navigate("/")}>
            <button type="button" width="300px" className="btn">
              Go back Shopping
            </button>
          </div>
        </div>
      </div>
    )

  }else if(product==="success"){
    return (
      <div className="success-wrapper container__completion">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order!</h2>
          <p className="email-msg">Check your email inbox for the receipt.</p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </p>
          <div onClick={()=>navigate("/")}>
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }


  
}

export default Success