


    import { useEffect, useState } from 'react';
    import axiosInstance from '../Helpers/axiosInstance';
    import toast from 'react-hot-toast';
    // import { useLocation } from 'react-router-dom';
    import { logout } from '../Redux/Slices/authSlice';
    import { useDispatch } from 'react-redux';
    import { useNavigate } from 'react-router-dom';
    function UserDashboard() {
        const [storeData, setStoreData] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [ratings, setRatings] = useState({}); 
        const dispatch = useDispatch();
        const navigate = useNavigate();
        
        const fetchStoreData = async () => {
            try {
                const response = await axiosInstance.get('/store/store-listing');
                console.log('res:',response);
                setStoreData(response.data.stores);
            } catch (error) {
                toast.error('Failed to load store data');
                console.error(error);
            }
        };
    useEffect(() => {

            fetchStoreData();
        }, []);
        
        const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
        };

        const handleRatingChange = (storeId, rating) => {
            setRatings({
                ...ratings,
                [storeId]: rating
            });
        };
        const handleLogout = () => {
            dispatch(logout());
            navigate('/');
          };
        const handleSubmitRating = async (storeId) => {
            try {
                console.log(storeId);
                
                const rating = ratings[storeId];
                console.log(rating);
                // Implement rating submission logic here
                const response = await axiosInstance.post(`/store/rate/${storeId}`,{rating});

                if (response.data.success) {
                    toast.success('Rating submitted successfully');
                    // Update the storeData with the new rating if needed
                }
            } catch (error) {
                toast.error('Failed to submit rating');
            }
        };

        

        const filteredStores = storeData.filter((store) =>
            store.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.Address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className='p-4'>
                <input
                    type='text'
                    placeholder='Search by name or address...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='mb-4 p-2 border border-gray-300 rounded'
                />

                <table className='w-full border-collapse'>
                    <thead>
                        <tr>
                            <th className='border p-2'>Name</th>
                            <th className='border p-2'>Address</th>
                            <th className='border p-2'>Overall Ratings</th>
                            <th className='border p-2'>My Rating</th>
                            <th className='border p-2'>Submit Rating/Modify Rating</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStores.map((store) => (
                            <tr key={store._id}>
                                <td className='border p-2'>{store.Name}</td>
                                <td className='border p-2'>{store.Address}</td>
                                <td className='border p-2'>{store.overallRating}</td>
                                <td className='border p-2'>
                                    {store.myRating !== null ? store.myRating : 'Not Rated'}
                                </td>
                                <td className='border p-2'>
                                    <select
                                        value={ratings[store._id] || ''}
                                        onChange={(e) => handleRatingChange(store._id, e.target.value)}
                                        className='border p-1 rounded'
                                    >
                                        <option value=''>Select Rating</option>
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <option key={rating} value={rating}>
                                                {rating}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleSubmitRating(store._id)}
                                        className='ml-2 bg-blue-500 text-white px-2 py-1 rounded'
                                    >
                                        Submit
                                    </button>
                                </td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button
                    onClick={handleLogout}
                    className='mt-4 bg-red-500 text-white px-4 py-2 rounded'
                >
                    Logout
                </button>
            </div>
        );
    }

    export default UserDashboard;
