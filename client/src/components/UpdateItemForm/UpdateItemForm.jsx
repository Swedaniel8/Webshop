import React, { useCallback, useState, useEffect } from 'react'

import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
//import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

// ICONS
import { AiFillWarning } from 'react-icons/ai'

import { updateItems } from '../../slices/apiReducer'

import './UpdateItemForm.css'

const UpdateItemForm = ({productsInfo}) => {
    const dispatch = useDispatch()
    //const { executeRecaptcha } = useGoogleReCaptcha();
    //const [ tokenState, setTokenState ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState({base64:null})
    const [formData, setFormData] = useState({
        id:productsInfo._id,
        title:"",
        price:"",
        tags:"",    
        info:"",
        file:"",
        imglink:"",
        token:""
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
        //console.log("e.target: ",formData.number)
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
    }))}
    const submit = (e) => {
        e.preventDefault()
        
        var sendData = formData
        var filteredObj = {}
        Object.keys(sendData).forEach((e) => {
            if(sendData[e]){
                filteredObj[e] = sendData[e]
            }
        })
        //sendData["token"] = tokenState
        filteredObj["file"] = selectedFile
        console.log("sendData: ",filteredObj)
        setErrorMessage("")

        dispatch(updateItems(filteredObj))
            .then(unwrapResult)
            .then(res => {
                console.log("response updateItemForm: ",res)
                if(res.success && !res.err){
                    setErrorMessage(res.message)
                }else{
                    setErrorMessage(res.message)
                }
                setFormData({
                    title:"",
                    price:"",
                    tags:"",    
                    info:"",
                    file:"",
                    imglink:"",
                    token:""
                })
        })
    }
  return (
    <div className='component__updateitemform'>
        <div className='updateitemform__layout'>
            <h1>Update Item to database</h1>        
            <p><AiFillWarning id="react-icon"/>Every Change Will Remove the old and be replaced by the new. Empty fields will not replace anything</p>
            
            <form>
            <div className='contact__section-input-name'>
                <div>                  
                    <input type="text" id="ftitle" placeholder="New Title" onChange={handleChange} value={formData.title} name="title" required></input>
                </div>
                <div>
                    <input type="number" id="fprice" placeholder="New Price in SEK*" onChange={handleChange} value={formData.price} name="price" required></input>
                </div>
            </div>          

            <p>Current Tags: {productsInfo.tags}</p>            
            <input type="tags" id="ftags" placeholder="add tags... ex: tag1,tag2,tag3,tag4" onChange={handleChange} value={formData.tags} name="tags" required></input>

            <input type="text" id="fimglink" placeholder="Url link for image" onChange={handleChange} value={formData.imglink} name="imglink" required></input>
            
            

            <FileBase 
                type="file"
                accept='.jpg' // ändra till webp senare 
                id="fimg" 
                multiple={false}                       
                onDone={(base64) => setSelectedFile(base64)}
                name="file"                        
                required
                >
            </FileBase>

            <img src={selectedFile.base64} alt='No selected file' />

            <textarea id="finfo" placeholder="info about the product..." onChange={handleChange} value={formData.info} name="info" maxLength="800"></textarea>

            <div onClick={submit}>
                <button>submit</button>
            </div>
            </form>
            {errorMessage}
        </div>
        
  </div>
  )
}

export default UpdateItemForm