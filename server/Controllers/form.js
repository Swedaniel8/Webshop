"use strict";
import { load } from 'recaptcha-v3'
import axios from 'axios'
import nodemailer from 'nodemailer'
import Joi from 'joi'
import hummus from 'hummus';
import Stripe from 'stripe'
import dotenv from 'dotenv';
import Product from './../Models/productSchema.js'
import mongoose from 'mongoose'

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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




    const { title, price, info, file, token } = req.body
    delete file["file"]
    var tags = req.body.tags.replace(/\s+/g, '');
    const tagsArr = tags.split(",")
    console.log("contactPost: ", req.body)
    
    try {
        //const validation = await schema.validateAsync(req.body)        
        const newProduct = new Product({ title, price, tagsArr, info, file })
        await newProduct.save()
        return res.json({
            success: true,
            err: null,
            message: "Success! Item added to database"
        })
       
    } catch (error) {
        console.log("error career: ",error)
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
export const updatePaymentMethod = async(req, res) => {
    const { items, clientId } = req.body;
    console.log("items: ",items)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.update(
    clientId,
    {    
    amount: await calculateOrderAmount(items),
    /*currency "sek",    
    payment_method_types: ['klarna','card']*/
  });
  console.log("paymentIntent-update",paymentIntent)
  res.send({
    clientSecret: paymentIntent.client_secret, id:paymentIntent.id
  });

}

export const createPaymentMethod = async(req, res) => {
    const { items } = req.body;
    //console.log("items: ",items)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: await calculateOrderAmount(items),
    currency: "sek",
    /*automatic_payment_methods: {
      enabled: true,
    },*/
    payment_method_types: ['klarna','card']
  });
  //console.log("paymentIntent",paymentIntent)
  res.send({
    clientSecret: paymentIntent.client_secret, id:paymentIntent.id
  });

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
    const idArrary = []
    items.forEach((item)=>{
        idArrary.push(item._id)
    })
    const foundItems = await Product.find({$in: idArrary})
    //console.log("foundItemsPAY: ", foundItems[0]._id)
    items.forEach((item)=>{
        for(let dbItem of foundItems){
            if(dbItem._id.toString() === item._id){
                //console.log("dbItem.price ",dbItem.price)
                //console.log("item.quantity   ", item.qty  )
                totalPrice += dbItem.price * item.qty  
          }	
        }
      })
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    console.log("totalPrice: ",totalPrice)
    return totalPrice * 100;
  };