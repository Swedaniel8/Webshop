import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { BiLogOut } from 'react-icons/bi'


import './AdminNavbar.css'
const AdminNavbar = () => {
    const navigate = useNavigate()
    const [itemsState, setItemsState] = useState({items:false,orders:false})

    /*const handleChange = (e) => {
        console.log("e: ",e)
        setItemsState(!itemsState)        
        let tl = gsap.timeline()
        
        tl.fromTo(`.${e}`,{
            x:-400
        },{
            x:0
        })

        itemsState ? tl.play() : tl.reverse()
    }*/

    const handleSecCol = (target) => {
        setItemsState({items:false,orders:false})
        setItemsState(prev => ({...prev,
                [target] : true
        }))        
    }

  return (
    <div className='component__adminnavbar'>
        <div className='adminnavbar__user'>
            <p>AdminUser</p>
            <BiLogOut id="react-icon" />
        </div>
        
        <div className='adminnavbar__functions'>
            <button onClick={()=>handleSecCol("items")}> Items </button>
            <button onClick={()=>handleSecCol("orders")}> Orders </button>            
        </div>
    </div>
  )
}

export default AdminNavbar