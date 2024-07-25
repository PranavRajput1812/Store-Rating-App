import  { useEffect, useState } from 'react';
import axiosInstance from '../Helpers/axiosInstance';

const StoreList = () => {
  const [store, setStore] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        async function fetchDashBoardData() {
          try {
            const response = await axiosInstance.get('/store/store-listing');
            console.log('Dashboard data:', response.data);
            setStore(response.data.stores);
          } catch (error) {
            console.error('Error loading dashboard data:', error);
          }
        }
    
        fetchDashBoardData();
      }, []);
     
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
      const filteredStores = store.filter((store) =>
        store.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.Address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  
      return (
       
       
        <div className="container mx-auto p-4">
            <label htmlFor="">Search By Name/Address :</label>
             <input
            type='text'
            placeholder='Search by name or address...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='ml-3 mb-4 p-2 border border-gray-800 rounded'
        />
          <h2 className="text-2xl font-semibold mb-4">User List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-2 px-4 text-left text-gray-600 font-medium">Name</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-medium">Email</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-medium">Address</th>
                  <th className="py-2 px-4 text-left text-gray-600 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map(store => (
                  <tr key={store.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-gray-800">{store.Name}</td>
                    <td className="py-2 px-4 text-gray-800">{store.email}</td>
                    <td className="py-2 px-4 text-gray-800">{store.Address}</td>
                    <td className="py-2 px-4 text-gray-800">{store.overallRating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
};

export default StoreList;
