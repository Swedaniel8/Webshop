import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItemPost, getItem} from '../service/service'

export const addItemPosts = createAsyncThunk(
    "post/addItem",
    async(info) => {
        console.log("addItem; ",info)
        const res = await addItemPost(info)
        return res.data
    }
)
export const getItems = createAsyncThunk(
    "post/getItems",
    async() => {        
        const res = await getItem()
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

    }
})

const { reducer } = postSlice

export default reducer