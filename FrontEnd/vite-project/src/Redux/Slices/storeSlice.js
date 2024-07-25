import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    storeData:[]
}

export const getAllStore = createAsyncThunk('/store/get',async(data)=>{
    try {
        const response = axiosInstance('store/store-listing',data);
        toast.promise(response,{
            loading:'Loading Data...',
            success:'store Data Loaded Successfully...',
            error : 'Failed to load store Data'
        })
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }
})

const storeSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllStore.fulfilled,(state,action)=>{
            if (action.payload) {
                console.log(action.payload);
                state.storeData = [action.payload];
            }
           
           
        })


    }
})

export default storeSlice.reducer;