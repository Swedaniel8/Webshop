import React, { useEffect, useState } from 'react'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineFullscreenExit } from 'react-icons/ai'
import { IoIosRemoveCircleOutline,IoIosArrowUp,IoIosArrowDown } from 'react-icons/io'

// REDUX //
import { useDispatch } from 'react-redux'
import { addToCart, removeQuantityFromItem, removeItemCart } from '../../slices/cart'

import { images } from '../../constants/images'
import './ProductCardCheckout.css'

const ProductCardCheckout = ({productsInfo}) => { 
    
    const dispatch = useDispatch() 
    const handleQuantity = (state) => {
        
        
        if(state){
            dispatch(addToCart(productsInfo))
        }else{        
            dispatch(removeQuantityFromItem(productsInfo))
        }
    }

  return (
    <div className='component__productcardcheckout' >
        <div className='productcardcheckout__content-1'>
            <div className='productcardcheckout__img'> 
                <img src={productsInfo.file.base64} alt={productsInfo.altImg}/>
            </div>
            <div className='productcardcheckout__info' >
                <h1>{productsInfo.title}</h1>          
                <div className='productcardcheckout__info-quantity'>
                    <h5>Qty</h5>
                    <IoIosArrowUp id="react-icon-plus" onClick={()=>handleQuantity(true)}/>
                    <p>{productsInfo.quantity}</p>
                    {productsInfo.quantity > 1 ?
                    <IoIosArrowDown id="react-icon-minus" onClick={()=>handleQuantity(false)}/>
                    :<div style={{display:"none"}}></div>}
                    
                </div>
                                     
            </div>    
        </div>
        <div className='productcardcheckout__content-2'>
            <h4>{productsInfo.price * productsInfo.quantity} SEK</h4>   
            <IoIosRemoveCircleOutline id='react-icon-remove' onClick={()=>dispatch(removeItemCart(productsInfo))}/>    
        </div>
        
    </div>
  )
}

export default ProductCardCheckout