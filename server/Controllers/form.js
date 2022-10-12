"use strict";
import { load } from 'recaptcha-v3'
import axios from 'axios'
import nodemailer from 'nodemailer'
import Joi from 'joi'
import hummus from 'hummus';
import Stripe from 'stripe'
import dotenv from 'dotenv';
import Product from './../Models/productSchema.js'
import Invoice from './../Models/invoiceSchema.js'
import mongoose from 'mongoose'

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//! -------------------------------------------------------
//TODO INPUT VALIDATION AND TOKEN VALIDATION FOR EVERY API CALL
//! -------------------------------------------------------

export const addItemPost = async(req, res) => {
    const errMsg = "Something went wrong adding the item"
    // VALIDATION SCHEMA
    const schema = Joi.object({
        firstname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/) // abcABCåäöÅÄÖ is allowed
            .min(1)
            .max(30)
            .required(),
        lastname: Joi.string()
            .pattern(/^[a-zA-ZåäöÅÄÖ]+$/)
            .min(1)
            .max(30)
            .required(), 
        email: Joi.string()
            .email({minDomainSegments: 2})
            .required(), 
        number: Joi.string()
            .pattern(/^[\+]?[0-9]+$/) // + (or not a plus sign) followed by 14-15 numbers
            .max(15), 
        other: Joi.string()
            .pattern(/^[.,?!%"=+*()a-zA-Z0-9\s]*$/)
            .min(0)
            .max(800), 
        token: Joi.string()
            .pattern(/^[-_a-zA-Z0-9]+$/)
            .required()
    })




    const { title, price, info, imglink, file, token } = req.body
    
    
    //console.log("contactPost: ", req.body)
    
    // Adds to stripe database for payment and mongodb for showing on website.
    try {
        //const validation = await schema.validateAsync(req.body) 
        var tags = req.body.tags.replace(/\s+/g, '');
        const tagsArr = tags.split(",")
        delete file["file"]
               
        const newProduct = new Product({ title, price, tagsArr, info, file })
        await newProduct.save()
        const product = await stripe.products.create({
            name: title,
            description: info,
            images: [imglink],
            default_price_data: {
                currency: "sek",
                unit_amount: price * 100
            },

          });
        return res.json({
            success: true,
            err: null,
            message: "Success! Item added to database"
        })
       
    } catch (error) {
        console.log("error addItemPost: ",error)
        return res.json({success:null, err:true, message:errMsg})
    }
    return res.json({success:null, err:true})
}
export const getItemsGet = async(req, res) => {
    const errMsg = "Something went wrong fetching the item"
    
    try {
        //const validation = await schema.validateAsync(req.body)        
        const foundItems = await Product.find()
        //console.log("foundItem: ",foundItems)
        
        return res.json({
            success: true,
            err: null,
            products: foundItems
        })
       
    } catch (error) {
        console.log("error career: ",error)
        return res.json({success:null, err:true, message:errMsg})
    }
    return res.json({success:null, err:true})
}
export const deleteItem = async(req, res) => {
    const errMsg = "Something went wrong deleting the item"
    const { formId, productId } = req.params
    // checks so Ids is true and equal
    console.log("formId: ",formId)
    console.log("productId: ",productId)
    if(formId !== productId || !formId || !productId ) return res.json({success:null, err:true, message:errMsg})
    try {
        //const validation = await schema.validateAsync(req.body)        
        const deletedItem = await Product.findByIdAndDelete(productId)        
        return res.json({success: true,err: null, message: "Success! Item deleted from database"})       
    } catch (error) {
        console.log("error delete: ",error)
        return res.json({success:null, err:true, message:errMsg})
    }
    return res.json({success:null, err:true})
}
export const updateItem = async(req, res) => {
    const errMsg = "Something went wrong deleting the item"
    const { id, title, price, info, file, token } = req.body       
    console.log("req.body: ",req.body) 
    try {
        //const validation = await schema.validateAsync(req.body)   
        var tagsArr
        if(req.body.tags){
            var tags = req.body.tags.replace(/\s+/g, '');
            tagsArr = tags.split(",")
        }
        const data = file.base64 ? { title, price, info, file, tagsArr } : { title, price, info, tagsArr }
        var filteredObj = {}
        Object.keys(data).forEach((e) => {
            if(data[e]){
            filteredObj[e] = data[e]
        }
        })
        const updatedItem = await Product.findByIdAndUpdate(id, filteredObj,{new:true})
        console.log("updatedItem: ",updatedItem)
        return res.json({success: true,err: null,message: "Success! Item updateed in database"})       
    } catch (error) {
        console.log("error delete: ",error)
        return res.json({success:null, err:true, message:errMsg})
    }
    return res.json({success:null, err:true})
}
export const updatePaymentMethod = async(req, res) => {
    const { items, clientId } = req.body;
    console.log("items: ",items)

    //const paymentIntentOld = await stripe.paymentIntents.cancel(clientId);
    //console.log("paymentIntentOld: ",paymentIntentOld)
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({    
        amount: await calculateOrderAmount(items),
        currency: "sek",    
        payment_method_types: ['klarna','card']
    });
    //console.log("paymentIntent-update",paymentIntent)
    res.send({
        clientSecret: paymentIntent.client_secret, id:paymentIntent.id
    });

}
export const createPaymentMethod2 = async(req, res) => {
    const { items } = req.body;    
    try {            
        // Create a PaymentIntent with the order amount and currency
        const {totalPrice, newItems, totalQuantity} = await calculateOrderAmount(items)
        //console.log("await calculateOrderAmount(items) ", await calculateOrderAmount(items))
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice,
            currency: "sek",
            /*automatic_payment_methods: {
            enabled: true,
            },*/
            payment_method_types: ['klarna','card']
        });
        //console.log("paymentIntent",paymentIntent)
        if(!paymentIntent) return 
        const newInvoice = new Invoice({
            paymentId:paymentIntent.id,
            //email:pa
            totalPrice,
            totalQuantity,
            items: newItems

        })
        await newInvoice.save()                
        res.send({
            clientSecret: paymentIntent.client_secret, id:paymentIntent.id
        });
    } catch (error) {
     console.log("error payment: ",error)       
    }

}
export const createPaymentMethod = async(req, res) => {
    try {
        const items = req.body
        /* console.log("itemsPrice: ",items[0].price)
        console.log("itemsquanity: ",items[0].quantity)
        console.log("itemstitle: ",items[0].title)
        console.log("itemsId: ",items[0]._id) */
        const {totalPrice, newItems, totalQuantity} = await calculateOrderAmount(items)
        /* console.log("newItemsprice: ",newItems[0].itemPrice)
        console.log("newItemsquantity: ",newItems[0].itemQuantity)
        console.log("newItemstitle: ",newItems[0].itemTitle) */
        console.log("newItemstitle: ",newItems[0].img)
        const params = {
          submit_type: 'pay',
          mode: 'payment',
          payment_method_types: ['card'],
          billing_address_collection: 'auto',
          line_items: newItems.map((item) => {
           return {
             
              price: item.priceId,
              quantity: item.itemQuantity,
            }
         }),

        //? line_items above for Stripe database and below for mongoDb
          /* shipping_options: [
            { shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' },
          ], */
          /* line_items: newItems.map((item) => {
            //const img = item.img.asset._ref;
            //const newImage = img.replace('image-', `http://localhost:3000/images/${item.img}`).replace('-webp', '.webp');
  
            return {
              price_data: { 
                currency: 'sek',
                product_data: { 
                  name: item.itemTitle,
                  images: ['http://localhost:3000/images/productCardItem.png'], //TODO bilder fungerar ej, kanske använda stripe som Db och lägg till produkter där?
                },
                unit_amount: item.itemPrice * 100
              },
              adjustable_quantity: {
                enabled:true,
                minimum: 1,
              },
              quantity: item.itemQuantity
            }
          }), */

          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/canceled`,
        }
  
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
        console.log("session: ",session)
        res.status(200).json(session);
      } catch (err) {
        console.log("error: ",err)
        res.status(err.statusCode || 500).json(err.message);
      }
    

}
export const getAllPayments = async(req, res) => {
    const errMsg = "Something went wrong deleting the item"
    const { id, title, price, info, file, token } = req.body       
    console.log("req.body: ",req.body) 
    try {
        const paymentIntents = await stripe.paymentIntents.list({
            
          });
        return res.json({success: true,err: null,message: "Success! Item updateed in database"})       
    } catch (error) {
        console.log("error delete: ",error)
        return res.json({success:null, err:true, message:errMsg})
    }
    return res.json({success:null, err:true})
}


const sendMail = async(mailOptions) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.USER,
            pass: process.env.PASS,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    })
    try {
        let mail = await transporter.sendMail(mailOptions)    
        console.log("mail send: ",mail)
        return {success:true, err:null}
    } catch (error) {
        console.log("error send mail: ",error)
        return {success:null, err:true}
    }

}
const calculateOrderAmount = async(items) => {
    var totalPrice = 0
    var totalQuantity = 0
    const idArrary = []
    const newItems = []
    items.forEach((item)=>{
        idArrary.push(item._id)
    })
    const foundItems = await Product.find({$in: idArrary})
    //console.log("foundItemsPAY: ", foundItems[0]._id)
    items.forEach((item)=>{
        for(let dbItem of foundItems){
            if(dbItem._id.toString() == item._id){
                //console.log("dbItem.price ",dbItem.price)
                //console.log("item.quantity   ", item.quantity  )
                totalPrice += dbItem.price * item.quantity  
                totalQuantity += item.quantity  
                newItems.push({
                    itemId: dbItem._id,
                    itemTitle: dbItem.title,
                    itemPrice: dbItem.price,
                    totalItemsPrice: dbItem.price * item.quantity,
                    itemQuantity: item.quantity,
                    img: dbItem.file.name,
                    priceId: dbItem.priceId
                  })
          }	
        }
      })

    //console.log("totalPrice: ",totalPrice)
    return {totalPrice:totalPrice * 100, newItems, totalQuantity};
  };

  //TODO Add priceId to database from the stripe database.