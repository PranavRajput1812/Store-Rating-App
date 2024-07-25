import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";



const initialState = {
    isLoggedIn : localStorage.getItem('isLoggedIn') || false ,
    role: localStorage.getItem('role') || '' ,
    data: localStorage.getItem('data') || {}
    // data: JSON.parse(localStorage.getItem('data') )|| {}
    //data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        console.log('data :',data);
        const response = axiosInstance.post("user/register", data);
        toast.promise(response, {
            loading: 'Wait! creating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to create your account'
        });
        // this return becomes action.payload
        return await response;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})


// login is an action defined outside. Thus extra-reducers are used to define reducers for such actions defined outside
export const login = createAsyncThunk("/auth/signin", async (data) => {
    try {
        const response = axiosInstance.post("user/login", data);
        toast.promise(response, {
            loading: 'Wait! authenticating your account',
            success: (data) => {
                return data?.data?.message;
            },
            error: 'Failed to authenticate your account'
        });

        // this return becomes action.payload
        return await response;
    } catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
})


export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const response = axiosInstance.get("user/logout");
        // console.log(response);
        toast.promise(response, {
            loading: 'Wait! logging out your account',
            success: (data) => {
                return data?.data?.message;
            },
            error:"failed to Logout"
            
        });

        // this return becomes action.payload
        return (await response).data;
    } catch(error) {
        // console.log(error);
         toast.error(error?.response?.data?.message);
    }
})




const authSlice = createSlice({
    name: 'auth' ,
    initialState ,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.data));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.data?.existingUser?.role);

            state.isLoggedIn = true;
            state.role = action?.payload?.data?.existingUser?.role;
            state.data = action?.payload?.data?.existingUser;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.role = "";
            state.data = {};
        })
       
    }
})

export default authSlice.reducer