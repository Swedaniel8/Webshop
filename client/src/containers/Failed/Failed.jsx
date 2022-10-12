import React from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Routes,
    useParams,
  } from "react-router-dom";
const Failed = () => {
    const { redirect_status } = useParams();
    console.log("redirect_status: ",redirect_status)
    if(redirect_status==="failed"){  
        return (    
            <div>Failed</div>    
        ) 

    }else if(redirect_status==="success"){
        return (    
            <div>Success</div>    
        )
    }
}
export default Failed