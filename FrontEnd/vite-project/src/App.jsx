import './App.css'
import {  Route, Routes } from 'react-router-dom'
import Home from './Component/Home.jsx'
import './index.css';
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import AdminDashboard from './Pages/AdminDashboard.jsx';
import UserDashboard from './Pages/UserDashBoard.jsx';
import StoreOwnerDashboard from './Pages/StoreDashboard.jsx';
import UserList from './Pages/UserList.jsx';
import StoreList from './Pages/StoreList.jsx'
import ChangePassword from './Pages/ChangePassword'

function App() {


  return (
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={ <Signup/> } />
      <Route path='/login' element={ <Signin/> } />
      <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}/>
      <Route path='/storeOwner-dashboard' element={<StoreOwnerDashboard/>}/>
      <Route path='/usersList' element={<UserList/>}/>
      <Route path='/storesList' element={<StoreList/>}/>
      <Route path='/change-password' element={ <ChangePassword/> } />

    </Routes>
  )
}

export default App
