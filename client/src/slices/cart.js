import { createSlice } from '@reduxjs/toolkit'
localStorage.clear();
//localStorage.setItem("cartInfo",JSON.stringify([{["_id"]:"123123",a:123123,quantity:1}, {["_id"]:"1232323",quantity:1},{["_id"]:"454545",l:123123132123132,quantity:1}])) 
const getNumberItems = () =>{
    const cart = getCart()   
    let count = 0
    if(cart.length === 0){
        return 0
    }
    cart.forEach(item => {
        count += item.quantity
    })             
    return count
}
const getCart = () => {    
    const cart = JSON.parse(localStorage.getItem("cartInfo")) 
    if(!cart){
        return []        
    }else {
        return cart
    }
}
const Cart = createSlice({
    name:"cartinfo",
    initialState: {cartInfo:[],length:0},
    reducers: {
        addToCart(state, action){
            try {                            
                const stateCart = state.cartInfo
                const storageCart = getCart() 
                const storagePayload = {"_id": action.payload["_id"],quantity: action.payload.quantity}
                if(stateCart.length === 0) {
                    
                    localStorage.setItem("cartInfo",JSON.stringify([storagePayload])) 
                    state["cartInfo"] = [action.payload]
                    console.log("STATE: ",state.cartInfo)
                    state["length"] = getNumberItems()
                    return state
                }
                const indexFound = stateCart.findIndex(e => e["_id"] === action.payload["_id"])

                if(indexFound >= 0){                
                    stateCart[indexFound]["quantity"] += 1
                    storageCart[indexFound]["quantity"] += 1
                }else {
                    stateCart.push(action.payload)
                    storageCart.push(storagePayload)
                }
                localStorage.setItem("cartInfo",JSON.stringify(storageCart))   
                state["cartInfo"] = stateCart
                state["length"] = getNumberItems()
            return state
            } catch (error) {
                console.log("error addToCart: ",error)       
                localStorage.clear();
                state["cartInfo"] = []
                state["length"] = 0
            }
        },
        removeQuantityFromItem(state, action){
            try {                            
                const storageCart = getCart()         
                const stateCart = state.cartInfo                         
                const indexFoundStorage = storageCart.findIndex(e => e["_id"] === action.payload["_id"])
                const indexFoundState = stateCart.findIndex(e => e["_id"] === action.payload["_id"])

                if(indexFoundStorage >= 0 && indexFoundState >= 0){                
                    if(storageCart[indexFoundStorage]["quantity"] === 1 && stateCart[indexFoundStorage]["quantity"] === 1){
                        storageCart.splice(indexFoundStorage, 1)
                        stateCart.splice(indexFoundState, 1)
                    }else{
                        storageCart[indexFoundStorage]["quantity"] -= 1
                        stateCart[indexFoundState]["quantity"] -= 1
                    }
                    localStorage.setItem("cartInfo",JSON.stringify(storageCart))   
                    state["cartInfo"] = stateCart
                    state["length"] = getNumberItems()
                }
                return state
            } catch (error) {
                console.log("error addToCart: ",error)       
                localStorage.clear();
                state["cartInfo"] = []
                state["length"] = 0
            }
        },                
        removeItemCart(state, action){
            try {                            
                const storageCart = getCart()         
                const stateCart = state.cartInfo                         
                const indexFoundStorage = storageCart.findIndex(e => e["_id"] === action.payload["_id"])
                const indexFoundState = stateCart.findIndex(e => e["_id"] === action.payload["_id"])
                if(indexFoundStorage >= 0 && indexFoundState >= 0){                
                    storageCart.splice(indexFoundStorage, 1)            
                    stateCart.splice(indexFoundState, 1)
                }
                localStorage.setItem("cartInfo",JSON.stringify(storageCart))   
                state["cartInfo"] = stateCart
                state["length"] = getNumberItems()
                return state
            } catch (error) {
                console.log("error addToCart: ",error)       
                localStorage.clear();
                state["cartInfo"] = []
                state["length"] = 0
            }
        },
        
    }
})

const { reducer } = Cart

export const { addToCart, removeQuantityFromItem, removeItemCart } = Cart.actions

export default reducer