import React, { useCallback, useState, useEffect } from 'react'

import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
//import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';


// ICONS
import { AiFillWarning } from 'react-icons/ai'

// REDUX
import { deleteItems } from '../../slices/apiReducer'

import './RemoveItemForm.css'

const RemoveItemForm = ({productsInfo}) => {
    const dispatch = useDispatch()
    //const { executeRecaptcha } = useGoogleReCaptcha();
    //const [ tokenState, setTokenState ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")    
    const [formData, setFormData] = useState({        
        formId:""        
    })
    /*-----------------------RECAPTCH VERIFY-------------------
    const handleReCaptchaVerify = useCallback(async () => {
        if(!executeRecaptcha){
            console.log('Execute recaptcha not yet available');
            return;
        }
        const token = await executeRecaptcha('login_page');
        setTokenState(token)
    },[executeRecaptcha])
    useEffect(() => {
        handleReCaptchaVerify();
        }, [handleReCaptchaVerify]);
    /*-----------------------RECAPTCH VERIFY-------------------*/ 
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
    }))}
    const submit = (e) => {
        e.preventDefault()
        
        var sendData = formData
        //sendData["token"] = tokenState
        sendData["productId"] = productsInfo._id
        console.log("sendData: ",sendData)
        setErrorMessage("")

        dispatch(deleteItems(sendData))
            .then(unwrapResult)
            .then(res => {
                console.log("response removeitemform: ",res)
                if(res.success && !res.err){
                    setErrorMessage(res.message)
                }else{
                    setErrorMessage(res.message)
                }
                
            })
    }
  return (
    <div className='component__removeitemform'>
        <h1>Remove Item from Database</h1> 
        <form>
             
        <p><AiFillWarning id="react-icon"/>Removing an item will permantly delete the item from the database</p>  
        <label htmlFor='fid'> Please write the id: <strong>{productsInfo._id}</strong> below to confirm you want to delete the item</label>
        <input type="text" id="fid" placeholder="Id" onChange={handleChange} value={formData.formId} name="formId" required></input>

        
        

        <div onClick={submit}>
            {formData.formId === productsInfo._id ? 
            <button className='delete-btn'>Delete</button>
            :
            <button className='disabled-btn'>Delete</button>
            }
        </div>

        </form>
        {errorMessage}
  </div>
  )
}

export default RemoveItemForm