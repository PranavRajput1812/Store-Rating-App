import { useEffect, useState } from 'react';
import axiosInstance from '../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation ,useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/authSlice';


function StoreOwnerDashboard() {
    const [storeData, setStoreData] = useState([]);
    const [userRatings, setUserRatings] = useState([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { existingId } = location.state || {}
    
    console.log(existingId);


    const fetchStoreAndRatingsData = async () => {
        try {
          
           
            const storeResponse = await axiosInstance.get(`/store/${existingId}/user`);
            console.log(storeResponse);
            setUserRatings(storeResponse.data.users);
            setStoreData(storeResponse.data.storeUser);
            console.log(storeResponse);
  

           
        } catch (error) {
            toast.error('Failed to load data');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStoreAndRatingsData();
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
      };
      const handleChangePassword = () => {
        navigate("/change-password");
      };


    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <div className="flex space-x-4 justify-end">
  <button
    onClick={handleLogout}
    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 mb-5"
  >
    Logout
  </button>
  <button
    onClick={handleChangePassword}
    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 mb-5"
  >
    Change Password
  </button>
</div>
            <h1 className='text-2xl font-bold mb-6 text-center'>Store Owner Dashboard</h1>

            {storeData && (
                <div className='mb-8 bg-white p-4 rounded shadow-lg'>
                    <h2 className='text-xl font-semibold mb-2'>Store Information</h2>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <p><strong>Name:</strong> {storeData.Name}</p>
                            <p><strong>Address:</strong> {storeData.Address}</p>
                        </div>
                        <div>
                            <p><strong>Email:</strong> {storeData.email}</p>
                            <p><strong>Overall Rating:</strong> {storeData.overallRating}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className='bg-white p-4 rounded shadow-lg'>
                <h2 className='text-xl font-semibold mb-2'>User Ratings</h2>
                {userRatings.length > 0 ? (
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr>
                                <th className='border p-2'>Name</th>
                                <th className='border p-2'>Email</th>
                                <th className='border p-2'>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userRatings.map((user) => (
                                <tr key={user._id}>
                                    <td className='border p-2'>{user.Name}</td>
                                    <td className='border p-2'>{user.email}</td>
                                    <td className='border p-2'>{user.Address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className='text-gray-500'>No ratings available.</p>
                )}
            </div>

            <div className='flex justify-center mt-6'>
                
            </div>
        </div>
    );
}



export default StoreOwnerDashboard;
