import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosInstance'



const initialState = {
    dashBoardData : []
}

export const getDashboardData = createAsyncThunk('/admin/get',async()=>{
    try {
        const response = axiosInstance.get('admin/admin-dashboard')
        toast.promise(response,{
            loading:'Loading Data...',
            success:'Dashboard Data Loaded Successfully...',
            error : 'Failed to load Dashboard Data'
        })
        //console.log('response:',response);
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createStore = createAsyncThunk('/store',async()=>{
    try {
        const response = axiosInstance.post('store/add-Store');
        toast.promise(response,{
            loading:'Creating Store...',
            success:'Store Created Successfully...',
            error : 'Failed to create store'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getDashboardData.fulfilled,(state,action)=>{
            if (action.payload) {
                console.log(action.payload);
                state.dashBoardData = [action.payload];
            }
            console.log('data',state.dashBoardData);
           
        })


    }
})

export default adminSlice.reducer;