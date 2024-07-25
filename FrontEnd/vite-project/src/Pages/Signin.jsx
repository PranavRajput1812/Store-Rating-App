import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axiosInstance from '../Helpers/axiosInstance';

function Signin() {

  const navigate = useNavigate()


  const [signinData,setSigninData] = useState({
    email: "" ,
    password: "" ,
  })

  function handleUserInput (e) {
    const {name, value} = e.target
    setSigninData({
        ...signinData,
        [name] : value
    })
  }

  async function handleLogin (e) {
    e.preventDefault() 
try {
  

    if( !signinData.email || !signinData.password){
      toast.error('Please fill all the details !')
      return
    }
console.log(signinData);
    const response = await axiosInstance.post('/user/login',signinData);
   console.log(response);
    if (response.data.success) {
      const userRole = response.data.existingUser.role;
      let existingId =  response.data.existingUser.email;
      console.log(existingId);
     // console.log(userRole);
      if (userRole == 'ADMIN') {
        navigate('/admin-dashboard');
      } 
      if(userRole =='USER'){
        navigate('/user-dashboard')
      }
      if (userRole == 'STOREOWNER') {
        navigate('/storeOwner-dashboard',{ state: { userRole, existingId } });
      }
    } 
else{
  toast.error(response.data.message)
}
    

    setSigninData({
      email: "" ,
      password: "" 
    })
  } catch (error) {
    toast.error(error.message)
  }

  }

  return (
  
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={handleLogin} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Login</h1>

        <div className='mb-4'>
          <input
            type='email'
            required
            name='email'
            id='email'
            placeholder='Enter your Email...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signinData.email}
          />
        </div>

        <div className='mb-6'>
          <input
            type='password'
            required
            name='password'
            id='password'
            placeholder='Enter your password...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signinData.password}
          />
        </div>

        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Login
        </button>

        <p className='mt-4 text-center'>
          Do not have an account ?{' '}
          <Link to='/signup' className='text-blue-500 hover:underline'>
            Signup
          </Link>
          
        </p>
      </form>
    </div>
  
  );
}

export default Signin;
