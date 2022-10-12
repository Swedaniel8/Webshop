import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItemPost, getItem, deleteItem, updateItem, createProduct } from '../service/service'

export const addItemPosts = createAsyncThunk(
    "post/addItem",
    async(info) => {
        console.log("addItem; ",info)
        const res = await addItemPost(info)
        return res.data
    }
)
export const getItems = createAsyncThunk(
    "get/getItems",
    async() => {        
        const res = await getItem()
        return res.data
    }
)
export const deleteItems = createAsyncThunk(
    "delete/deleteItems",
    async(info) => {        
        const res = await deleteItem(info)
        return res.data
    }
)
export const updateItems = createAsyncThunk(
    "put/updateItems",
    async(info) => {        
        const res = await updateItem(info)
        return res.data
    }
)
export const createProducts = createAsyncThunk(
    "post/createProducts",
    async(info) => {        
        const res = await createProduct(info)
        return res.data
    }
)




const postSlice = createSlice({
    name:"post",
    initialState: [],
    extraReducers: {
        [addItemPosts.fulfilled]: (state, action) => {
            //return [...action.payload]
        },
        [getItems.fulfilled]: (state, action) => {
            //return [...action.payload]
        },
        [deleteItems.fulfilled]: (state, action) => {
            //return [...action.payload]
        },
        [updateItems.fulfilled]: (state, action) => {
            //return [...action.payload]
        },

    }
})

const { reducer } = postSlice

export default reducer