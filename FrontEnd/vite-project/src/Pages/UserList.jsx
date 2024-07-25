import  { useEffect, useState } from 'react';
import axiosInstance from '../Helpers/axiosInstance';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        async function fetchDashBoardData() {
          try {
            const response = await axiosInstance.get('/admin/getAllusers');
            console.log('Dashboard data:', response.data);
            setUsers(response.data.allUsers);
          } catch (error) {
            console.error('Error loading dashboard data:', error);
          }
        }
    
        fetchDashBoardData();
      }, []);
     
      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
      const filteredStores = users.filter((store) =>
        store.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.email.toLowerCase().includes(searchTerm.toLowerCase())||
        store.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  
      return (
       
       
        <div className="container mx-auto p-4">
            <label htmlFor="">Search By Name/Email/Address/Role :</label>
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
                  <th className="py-2 px-4 text-left text-gray-600 font-medium">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredStores.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 text-gray-800">{user.Name}</td>
                    <td className="py-2 px-4 text-gray-800">{user.email}</td>
                    <td className="py-2 px-4 text-gray-800">{user.Address}</td>
                    <td className="py-2 px-4 text-gray-800">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
};

export default UserList;
