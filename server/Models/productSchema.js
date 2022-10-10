import mongoose from "mongoose";
//{id:"123123",title:"headphone1",info:"1this is a text what else whatever..",price:10,img:"imgTest1", review:1,quantity:1},
// add contentType: image/png or whats needed to img: {}
const productSchema = mongoose.Schema({
    title: String,
    info: String,
    price: Number,
    file: {
        
       
    },
    altImg: {
        type:String,
        default: "productImg"
    },
    review: {
        type:Number,
        default: 0
    },
    quantity: {
        type:Number,
        default: 1
    },
    tags: [String]    
    
})

const Product = mongoose.model("Product", productSchema)

export default Product