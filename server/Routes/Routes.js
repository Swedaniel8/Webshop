"use strict";
import express from 'express';




import { addItemPost, createPaymentMethod ,getItemsGet, deleteItem, updateItem, getOrders  } from '../Controllers/form.js';

const router =  express.Router()

// POST, DELETE, GET, PUT REQUESTS
router.post("/additem",addItemPost)
router.get("/getitems",getItemsGet)
router.delete("/deleteitem/:formId/:productId",deleteItem)
router.put("/updateitem",updateItem)






// STRIPE PAYMENTS
router.post("/create-payment-intent",createPaymentMethod)

// GET
router.get("/getorders",getOrders)


//router.post("/update-payment-intent",updatePaymentMethod)




export default router