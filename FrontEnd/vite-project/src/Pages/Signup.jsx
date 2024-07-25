import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/Slices/authSlice';

function Signup() {


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [signupData,setSignupData] = useState({
    Name: "" ,
    email: "" ,
    password: "" ,
    Address: "" 
  })

  function handleUserInput (e) {
    const {name, value} = e.target
    setSignupData({
        ...signupData,
        [name] : value
    })
  }

  

  async function createNewAccount (e) {
    e.preventDefault() 

    if(!signupData.Name || !signupData.email || !signupData.password ||!signupData.Address){
      toast.error('Please fill all the details !')
      return
    }

    if(!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
      toast.error('Enter a valid email !')
      return
    }

    if(signupData.Name.length < 20){
      toast.error('Name should be atleast of 20 characters !')
      return
    }

    if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*]).{8,}$/)){
      toast.error('Enter a strong password !')
      return
    }
    if(signupData.password.length>16 && signupData.password.length<8){
      toast.error('Password Should be less than 16 characters and greater than 8');
      return
    }
    const formData = new FormData()

    formData.append('Name',signupData.Name)
    formData.append('email',signupData.email)
    formData.append('password',signupData.password)
    formData.append('Address',signupData.Address)

    const response = await dispatch(createAccount(formData))
     console.log(response);
    if(response?.payload?.data?.success){
      navigate('/')
    }

    setSignupData({
      Name: "" ,
      email: "" ,
      password: "" ,
      Address: "" 
    })

  

  }

  return (
    
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={createNewAccount} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Register</h1>

        

        <div className='mb-6'>
          <input
            type='text'
            required
            name='Name'
            id='Name'
            placeholder='Enter your full-name...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signupData.Name}
          />
        </div>

        <div className='mb-4'>
          <input
            type='email'
            required
            name='email'
            id='email'
            placeholder='Enter your Email...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signupData.email}
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
            value={signupData.password}
          />
        </div>

        <div className='mb-6'>
          <input
            type='text'
            required
            name='Address'
            id='Address'
            placeholder='Enter your Address...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={signupData.Address}
          />
        </div>

        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Create Account
        </button>

        <p className='mt-4 text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 hover:underline'>
            Login
          </Link>
        </p>
      </form>
    </div>
   
  );
}

export default Signup;
