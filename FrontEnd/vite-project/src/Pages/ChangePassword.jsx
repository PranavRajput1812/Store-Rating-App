// import React from 'react'

import { useState } from 'react'
import toast from 'react-hot-toast'
import axiosInstance from '../Helpers/axiosInstance'
import {useNavigate} from 'react-router-dom'

function ChangePassword() {

    const navigate = useNavigate()

    const [passwordDetails, setPasswordDetails] = useState({
        oldPassword: '' ,
        newPassword: '' ,
        confirmNewPassword: ''
    })

    function handleUserInput(e){
        // e.preventDefault()
        const {name, value} = e.target
        setPasswordDetails({
            ...passwordDetails ,
            [name]: value
        })
    }

    async function changePassword(e){
        e.preventDefault()

        if(!passwordDetails.oldPassword || !passwordDetails.newPassword || !passwordDetails.confirmNewPassword){
            toast.error('All fields are mandatory !')
            return
        }

        if(passwordDetails.newPassword !== passwordDetails.confirmNewPassword){
            toast.error('New Password wont match !')
        }

        try {
            const response = axiosInstance.post('/user/change-password',passwordDetails)
            const temp = await response
            console.log(`Temp: ${temp.data.success}`);

            if(temp?.data?.success){
              toast.success('Password changed successfully !')
              navigate(-1)
            }
            

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }


  return (
   
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={changePassword} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Change Password</h1>

        <div className='mb-4'>
          <input
            type='password'
            required
            name='oldPassword'
            id='oldPassword'
            placeholder='Enter your old password ...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={passwordDetails.oldPassword}
          />
        </div>

        <div className='mb-6'>
          <input
            type='password'
            required
            name='newPassword'
            id='newPassword'
            placeholder='Enter your new password...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={passwordDetails.newPassword}
          />
        </div>


        <div className='mb-6'>
          <input
            type='password'
            required
            name='confirmNewPassword'
            id='confirmNewPassword'
            placeholder='Confirm your new password...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={passwordDetails.confirmNewPassword}
          />
        </div>


        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Change Password
        </button>

      </form>
    </div>
  
  )
}

export default ChangePassword
