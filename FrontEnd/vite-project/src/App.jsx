import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Home from './Component/Home.jsx'
// src/index.js
import './index.css';
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import AdminDashboard from './Pages/AdminDashboard.jsx';
import UserDashboard from './Pages/UserDashBoard.jsx';
import StoreOwnerDashboard from './Pages/StoreDashboard.jsx';

function App() {


  return (
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={ <Signup/> } />
      <Route path='/login' element={ <Signin/> } />
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}/>
      <Route path='/storeOwner-dashboard' element={<StoreOwnerDashboard/>}/>
    </Routes>
  )
}

export default App
