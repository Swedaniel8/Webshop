import React, { useCallback, useState, useEffect } from 'react'

import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
//import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { FaRegEdit } from 'react-icons/fa'

import { addItemPosts, createProducts } from '../../slices/apiReducer'

import './AddItemForm.css'

const AddItemForm = () => {
    const dispatch = useDispatch()
    //const { executeRecaptcha } = useGoogleReCaptcha();
    //const [ tokenState, setTokenState ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ selectedFile, setSelectedFile ] = useState({base64:null})
    const [formData, setFormData] = useState({
        title:"XRM Headphones 5",
        price:"599",
        tags:"tags1, headphone,extreme",    
        info:" This is a great headhpone, so much power that you cant believe. the battery life sucks though (654 hours of non stop music).",
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
        //sendData["token"] = tokenState
        sendData["file"] = selectedFile
        console.log("sendData: ",sendData)
        setErrorMessage("")

        dispatch(addItemPosts(sendData))
            .then(unwrapResult)
            .then(res => {
                console.log("response careerPosts: ",res)
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
    <div className='component__additemform'>

        <div className='additemform__layout'>        
            <h1>Add new item to database</h1>        
            <form>
            <div className='contact__section-input-name'>
                <div>                  
                    <input type="text" id="ftitle" placeholder="Title*" onChange={handleChange} value={formData.title} name="title" required></input>
                </div>
                <div>
                    <input type="number" id="fprice" placeholder="Price in SEK*" onChange={handleChange} value={formData.price} name="price" required></input>
                </div>
            </div>          

            <input type="text" id="ftags" placeholder="add tags... ex: tag1,tag2,tag3,tag4" onChange={handleChange} value={formData.tags} name="tags" required></input>

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

export default AddItemForm