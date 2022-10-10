import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddItemForm } from '../../components/index';

import './Admin.css'
const Admin = () => {
  const navigate = useNavigate()
  


  return (
    <div className="container__admin">
      <AddItemForm />
    </div>
  )
}

export default Admin