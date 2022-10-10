import React, { useEffect, useState } from 'react'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineFullscreenExit } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'

// REDUX //
import { useDispatch } from 'react-redux'
import { addToCart, removeQuantityFromItem, removeItemCart } from '../../slices/cart'

import { images } from '../../constants/images'
import './ProductCardSmall.css'

const ProductCardSmall = ({productsInfo}) => { 
    
    const dispatch = useDispatch() 
    const handleQuantity = (state) => {
        
        
        if(state){
            dispatch(addToCart(productsInfo))
        }else{        
            dispatch(removeQuantityFromItem(productsInfo))
        }
    }

  return (
    <div className='component__productcardsmall' >
        <div className='productcardsmall__content-1'>
            <div className='productcardsmall__img'> 
                <img src={productsInfo.file.base64} alt={productsInfo.altImg}/>
            </div>
            <div className='productcardsmall__info' >
                <h1>{productsInfo.title}</h1>          
                <div className='productcardsmall__info-quantity'>
                    <AiOutlineMinus id="react-icon-minus" onClick={()=>handleQuantity(false)}/>
                    <p>{productsInfo.quantity}</p>
                    <AiOutlinePlus id="react-icon-plus" onClick={()=>handleQuantity(true)}/>
                </div>
                <p>Price: {productsInfo.price * productsInfo.quantity} SEK</p>                        
            </div>    
        </div>
        <IoIosRemoveCircleOutline id='react-icon-remove' onClick={()=>dispatch(removeItemCart(productsInfo))}/>    
    </div>
  )
}

export default ProductCardSmall