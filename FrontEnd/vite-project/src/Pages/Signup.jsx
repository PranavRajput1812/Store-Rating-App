import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../Helpers/axiosInstance';

function Signup() {
  const [signupData, setSignupData] = useState({
    Name: "",
    email: "",
    password: "",
    Address: "",
    role: ""
  });

  const navigate = useNavigate();

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!signupData.Name || !signupData.email || !signupData.password || !signupData.Address) {
      toast.error('Please fill all the details!');
      return;
    }

    if (!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      toast.error('Enter a valid email!');
      return;
    }

    if (signupData.Name.length < 20) {
      toast.error('Name should be at least 20 characters!');
      return;
    }

    if (!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*]).{8,}$/)) {
      toast.error('Enter a strong password!');
      return;
    }

    if (signupData.password.length < 8 || signupData.password.length > 16) {
      toast.error('Password should be between 8 and 16 characters!');
      return;
    }

    try {
      const userRegister = {
        Name: signupData.Name,
        email: signupData.email,
        password: signupData.password,
        Address: signupData.Address,
      };

      const response = await axiosInstance.post('/user/register', userRegister);

      if (response.data.success) {
        toast.success('User Created Successfully!');
        setSignupData({
          Name: "",
          email: "",
          password: "",
          Address: "",
          
        });
        navigate('/');
      }else{
        toast.error('User Already Exist')
      }
      
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={handleFormSubmit} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Register</h1>
        <div className='mb-6'>
          <input
            type='text'
            required
            name='Name'
            id='Name'
            placeholder='Enter your full name...'
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

