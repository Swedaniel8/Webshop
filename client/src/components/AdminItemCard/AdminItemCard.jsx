import React, {useState} from 'react'

// REACT ICONS //
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'


// SELF IMPORTS
import './AdminItemCard.css'
import { UpdateItemForm, RemoveItemForm } from '../index'

const AdminItemCard = ({productsInfo}) => {
  const [popupState, setPopupState] = useState({update:false,remove:false})
  const handlePopup = (target=null) =>{
    setPopupState({update:false,remove:false})

    // if target does not exist? then just close every popup
    if(target){      
      setPopupState(prev => ({...prev,
        [target]:true
      }))
    }

  }
  
  return (
    <div className='component__adminitemcard' >
          <div className='adminitemcard__content-1'>
              <div className='adminitemcard__img'> 
                  <img src={productsInfo.file.base64} alt={productsInfo.altImg}/>
              </div>
              <div className='adminitemcard__info' >
                  <h1>{productsInfo.title}</h1>           
                  <h5>id: {productsInfo._id}</h5>                 
                  <p>Price: {productsInfo.price * productsInfo.quantity} SEK</p>                        
              </div>    
          </div>
          <div className='adminitemcard__icons'>
            <IoIosRemoveCircleOutline id='react-icon-remove' onClick={()=>handlePopup("remove")}/>    
            <FaRegEdit id='react-icon-edit' onClick={()=>handlePopup("update")}/>    
          </div>

          <div className='adminitemcard__update'>
            {popupState.update && 
            <div>
              <UpdateItemForm productsInfo={productsInfo}/>
              <div className="component__adminitemcard__popup__blur" onClick={handlePopup}></div>
            </div>
            }
            {popupState.remove && 
            <div>
              <RemoveItemForm productsInfo={productsInfo}/>
              <div className="component__adminitemcard__popup__blur" onClick={handlePopup}></div>
            </div>
            }
          </div>


        </div>
  )
}

export default AdminItemCard