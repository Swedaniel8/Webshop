import http from '../http-common'

// POST 
export const addItemPost = (data) => {return http.post("/additem",data)}

// GET
export const getItem = () => {return http.get("/getitems")}

// DELETE
export const deleteItem = (data) => {return http.delete(`/deleteitem/${data.formId}/${data.productId}`)}

// PUT
export const updateItem = (data) => {return http.put("/updateitem",data)}



// STRIPE
// POST
export const createProduct = (data) => {return http.post("/createProductStripe",data)}

// GET
export const getOrder = (data) => {return http.get("/getorders")}
