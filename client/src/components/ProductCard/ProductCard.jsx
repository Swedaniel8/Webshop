import React, { useEffect, useState } from 'react'

import { AiOutlineFullscreenExit } from 'react-icons/ai'

// REDUX //
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../slices/cart'

import { images } from '../../constants/images'
import './ProductCard.css'


const ProductCard = ({productsInfo}) => { 
    
    //! SEND INDEX ALSO FROM PARENT
    const dispatch = useDispatch()
    const selector = useSelector(state => state.cart)
    const [popupItem, setPopItem ] = useState(false)
            
    const exitPopup = () =>{
        setPopItem(false)
    }    
    const addProductToCart = () => {
        console.log("productsInfo: ",productsInfo)
        dispatch(addToCart(productsInfo))
        console.log("selector: ",selector)
        
    }

  return (
    <div className='component__productcard' >
        <div className='productcard__info' >
            <h1>{productsInfo.title}</h1>
            <img src={productsInfo.file.base64} alt={productsInfo.altImg}/>        
            <p>Price: {productsInfo.price}</p>
            <div className='productcard__info-btns'>                
                <button className='productcard-btn1' onClick={addProductToCart}><span>add to cart</span></button>                                
                <button className='productcard-btn2' onClick={()=>setPopItem(true)}><span>more info</span></button>                
            </div>
            
        </div>
        { popupItem ? 
        <div className='productcard__popup'>
            <div className='productcard__popup-info'>
                <AiOutlineFullscreenExit id="react-icon" onClick={exitPopup}/>
                <h1>{productsInfo.title}</h1>
                <img src={productsInfo.file.base64} alt={productsInfo.altImg}/>
                <p>{productsInfo.info}</p>
                <p>Price: {productsInfo.price}</p>
                <button className='productcard-btn'>Add to chart</button>
            </div>
            <div className="productcard__popup__blur" onClick={exitPopup}></div>
        </div>
        
        :<div style={{display:"none"}}></div>}
    </div>
  )
}

export default ProductCard