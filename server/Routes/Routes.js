"use strict";
import express from 'express';




import { addItemPost, createPaymentMethod, updatePaymentMethod ,getItemsGet  } from '../Controllers/form.js';

const router =  express.Router()

//**    POST REQUESTS
router.post("/additempost",addItemPost)
router.get("/getitemsget",getItemsGet)

router.post("/create-payment-intent",createPaymentMethod)
router.post("/update-payment-intent",updatePaymentMethod)




export default router