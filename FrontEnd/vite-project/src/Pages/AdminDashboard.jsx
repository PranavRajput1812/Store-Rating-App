import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsers, fetchStores } from '../Redux/Slices/adminSlice';
import { logout } from '../Redux/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { getDashboardData,createStore } from '../Redux/Slices/adminSlice';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userDetails,setUserDetails] = useState({
    Name: "",
    email:"",
    password :"",
    Address : ""
  })

  const [storeDetails, setStoreDetails] = useState({
    Name: "",
    email: "",
    Address: "",
    Rating: ""
  });

  let dashBoardData = useSelector(state => state.admin.dashBoardData);
  console.log(dashBoardData);
  let userCount ;
  let storeCount;
  let userSubmitedRating;
  dashBoardData.forEach(element => {
        userCount = element.users;
        storeCount = element.stores;
        userSubmitedRating = element.userSubmitedRating;
  });
  
  function handleUserInput(e) {
    const{name,value} = e.target
    setUserDetails({
        ...userDetails,
        [name]:value
    })
  }

  const handleStoreInput = (e) => {
    const { name, value } = e.target;
    setStoreDetails({
      ...storeDetails,
      [name]: value
    });
  };

  async function handleFormSubmit (e) {
    e.preventDefault()

    if(!userDetails.Name || !userDetails.email || !userDetails.password || !userDetails.Address ){
      toast.error('All fields are required')
      return
    }

    // form-data is necessary whenever we need to send image at backend else data can be passed normally !
    const formData = new FormData()

    formData.append('Name', userDetails.Name)
    formData.append('email', userDetails.email)
    formData.append('password', userDetails.password)
    formData.append('Address', userDetails.Address)

    const response = await dispatch(getDashboardData(formData))
    // console.log(response);

    if(response?.payload?.success){
      setUserDetails({
        Name: "" ,
        email: "" ,
        password : "" ,
        Address: "" ,
    })
      navigate('/admin-dashboard')
    }

  }

  async function handleStoreFormSubmit(e) {
    e.preventDefault();

    if (!storeDetails.Name || !storeDetails.email || !storeDetails.Address || !storeDetails.Rating) {
      toast.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('Name', storeDetails.Name);
    formData.append('email', storeDetails.email);
    formData.append('Address', storeDetails.Address);
    formData.append('Rating', storeDetails.Rating);

    const response = await dispatch(createStore(formData));

    if (response?.payload?.success) {
      setStoreDetails({
        Name: "",
        email: "",
        Address: "",
        Rating: "",
      });
      navigate('/admin-dashboard');
    }
  }


  async function loadDashBoardData () {
    await dispatch(getDashboardData())
}
  useEffect(() => {
    loadDashBoardData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Total Users</h2>
            <p className="text-3xl text-indigo-500">{userCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">Total Stores</h2>
            <p className="text-3xl text-indigo-500">{storeCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">User Submitted Ratings</h2>
            <p className="text-3xl text-indigo-500">{userSubmitedRating}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Management Sections</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">Logout</button>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">User Management</h3>
          {/* Render user management table and forms here */}
          {/* <main className='grid grid-cols-2 gap-x-10'>
              <div className='gap-y-6'>
                
                  <div className="flex flex-col gap-2 mt-4">
                    <label htmlFor="clubName" className='text-lg font-semibold'>Name </label>
                    <input 
                      type="text" 
                      required
                      name=''
                      id='clubName'
                      placeholder='Enter Club Name'
                      className='bg-transparent px-2 py-1 border'
                      value={userDetails.clubName}
                      onChange={handleUserInput}
                    />
                  </div>
              </div>

              <div className='flex flex-col gap-1'>
                  
                  <div className="flex flex-col gap-2">
                    <label htmlFor="tagline" className='text-lg font-semibold'>Tagline </label>
                    <input 
                      type="text" 
                      required
                      name='tagline'
                      id='tagline'
                      placeholder='Enter tagline'
                      className='bg-transparent px-2 py-1 border'
                      value={userDetails.tagline}
                      onChange={handleUserInput}
                    />
                  </div> 
                  <div className="flex flex-col gap-2 mt-2">
                    <label htmlFor="description" className='text-lg font-semibold'>Description</label>
                    <textarea 
                      type="" 
                      required
                      name='description'
                      id='description'
                      placeholder='Enter description'
                      className='bg-transparent px-2 py-1 border resize-none '
                      value={userDetails.description}
                      onChange={handleUserInput}
                      rows='6'
                    />
                  </div> 


              </div>
          </main> */}
            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form noValidate onSubmit={handleFormSubmit} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-center text-2xl font-bold mb-6'>Create Account</h1>

        

        <div className='mb-6'>
          <input
            type='text'
            required
            name='Name'
            id='Name'
            placeholder='Enter your full-name...'
            className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
            onChange={handleUserInput}
            value={userDetails.Name}
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
            value={userDetails.email}
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
            value={userDetails.password}
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
            value={userDetails.Address}
          />
        </div>

        <button
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
          type='submit'
        >
          Create Account
        </button>

        
      </form>
    </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Store Management</h3>
          {/* Render store management table and forms here */}
          <form onSubmit={handleStoreFormSubmit} className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
            <h1 className='text-center text-2xl font-bold mb-6'>Create Store</h1>

            <div className='mb-6'>
              <input
                type='text'
                required
                name='Name'
                id='StoreName'
                placeholder='Enter store name...'
                className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                onChange={handleStoreInput}
                value={storeDetails.Name}
              />
            </div>

            <div className='mb-4'>
              <input
                type='email'
                required
                name='email'
                id='StoreEmail'
                placeholder='Enter store email...'
                className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                onChange={handleStoreInput}
                value={storeDetails.email}
              />
            </div>

            <div className='mb-6'>
              <input
                type='text'
                required
                name='Address'
                id='StoreAddress'
                placeholder='Enter store address...'
                className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                onChange={handleStoreInput}
                value={storeDetails.Address}
              />
            </div>

            <div className='mb-6'>
              <input
                type='text'
                required
                name='Rating'
                id='StoreRating'
                placeholder='Enter store rating...'
                className='w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500'
                onChange={handleStoreInput}
                value={storeDetails.Rating}
              />
            </div>

            <button
              className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all'
              type='submit'
            >
              Create Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};



export default AdminDashboard;
