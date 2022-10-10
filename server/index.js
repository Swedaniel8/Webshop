"use strict";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';

import routes from './Routes/Routes.js'

const app = express()
dotenv.config()

app.use(helmet())
app.use(bodyParser.json({limit: "300mb", extended:true}))
app.use(bodyParser.urlencoded({limit: "300mb", extended:true}))
app.use(cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "POST,GET,PUT,DELETE",
    credentials: true // allow session cookie from browser to pass through
  }))


app.use("/", routes)




const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

