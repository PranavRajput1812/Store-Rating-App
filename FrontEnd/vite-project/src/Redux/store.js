import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './Slices/authSlice'
import adminSlice from './Slices/adminSlice'


// NOTE: Whenever we need to use useSelector we need to access the state names as -> auth, clubs, events, companies. The name of the slice in the createSlice does not matter !
// eg: here while accessing companyData we need to accesss it as : useSelector(state => state.companies) even though the name of state is company we need to access it as state.companies since it is written in store as companies !


// NORMAL STORE BELOW

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        admin:adminSlice
        
    } ,
    devTools: true
})

export default store