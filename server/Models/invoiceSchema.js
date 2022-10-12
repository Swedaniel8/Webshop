import mongoose from "mongoose";
//{id:"123123",title:"headphone1",info:"1this is a text what else whatever..",price:10,img:"imgTest1", review:1,quantity:1},
// add contentType: image/png or whats needed to img: {}
const invoiceSchema = mongoose.Schema({
    paymentId: {
        type: String,
        unique: true,
        required:true    
    },
    other: String,
    email:String,
    totalPrice: Number,    
    totalQuantity: {
        type:Number,
        default: 0
    },
    items: [{
        itemId: String,
        itemTitle: String,
        itemPrice: Number,
        totalItemsPrice: Number,
        itemQuantity: {
            default: 1,
            type: Number
        }
    }]
    
})

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice