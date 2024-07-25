import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";

const AdminDashboard = () => {
  
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    Name: "",
    email: "",
    password: "",
    Address: "",
    role: "",
  });

  const [storeDetails, setStoreDetails] = useState({
    Name: "",
    email: "",
    Address: "",
    rating: "",
  });

  const [dashBoardData, setDashBoardData] = useState({
    stores: "",
    users: "",
    userSubmitedRating: "",
  });

  // Load dashboard data
  useEffect(() => {
    async function fetchDashBoardData() {
      try {
        const response = await axiosInstance.get("/admin/admin-dashboard");
        console.log("Dashboard data:", response.data);
        setDashBoardData(response.data);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    }

    fetchDashBoardData();
  }, []);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }

  const handleStoreInput = (e) => {
    const { name, value } = e.target;
    setStoreDetails({
      ...storeDetails,
      [name]: value,
    });
  };

  const [isUserFormVisible, setIsUserFormVisible] = useState(false);
  const [isStoreFormVisible, setIsStoreFormVisible] = useState(false);

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (
        !userDetails.Name ||
        !userDetails.email ||
        !userDetails.password ||
        !userDetails.Address ||
        !userDetails.role
      ) {
        toast.error("All fields are required");
        return;
      }

      const userRegister = {
        Name: userDetails.Name,
        email: userDetails.email,
        password: userDetails.password,
        Address: userDetails.Address,
        role: userDetails.role.toUpperCase(),
      };

      const response = await axiosInstance.post("/user/register", userRegister);

      if (response.data.success) {
        toast.success("User Created Successfully!");
        setUserDetails({
          Name: "",
          email: "",
          password: "",
          Address: "",
          role: "",
        });
        navigate("/admin-dashboard");
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  async function handleStoreFormSubmit(e) {
    e.preventDefault();

    if (
      !storeDetails.Name ||
      !storeDetails.email ||
      !storeDetails.Address ||
      !storeDetails.rating
    ) {
      toast.error("All fields are required");
      return;
    }

    const storeData = {
      Name: storeDetails.Name,
      email: storeDetails.email,
      Address: storeDetails.Address,
      rating: parseFloat(storeDetails.rating),
    };

    try {
      const response = await axiosInstance.post("/store/add-Store", storeData);
      console.log(response);

      if (response.data.success) {
        toast.success("Store Created Successfully!");
        setStoreDetails({
          Name: "",
          email: "",
          Address: "",
          rating: "",
        });
        navigate("/admin-dashboard");
      }
      if (response.data.message) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }
  const handleShowUsers = () => {
    navigate("/usersList");
  };

  const handleShowStores = () => {
    navigate("/storesList");
  };

  const handleLogout = async() => {
   
    let response = await axiosInstance.get('/user/logOut');
    if(response.data.success){
      toast.success(response.data.message)
      navigate("/");
    }
  };
  const handleChangePassword = () => {
    navigate("/change-password");
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Total Users
            </h2>
            <p className="text-3xl text-indigo-500">{dashBoardData.users}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Total Stores
            </h2>
            <p className="text-3xl text-indigo-500">{dashBoardData.stores}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              User Submitted Ratings
            </h2>
            <p className="text-3xl text-indigo-500">
              {dashBoardData.userSubmitedRating}
            </p>
          </div>
        </div>
        <button
          onClick={handleShowUsers}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Show User List
        </button>
        <button
          onClick={handleShowStores}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 ml-10"
        >
          Show Store List
        </button>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Management Sections
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
            <button
              onClick={handleChangePassword}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            User Management
          </h3>
          <button
            onClick={() => setIsUserFormVisible(!isUserFormVisible)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
          >
            {isUserFormVisible ? "Close" : "Create User "}
          </button>
          {isUserFormVisible && (
            <form
              noValidate
              onSubmit={handleFormSubmit}
              className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto"
            >
              <h1 className="text-center text-2xl font-bold mb-6">
                Create Account
              </h1>
              <div className="mb-6">
                <input
                  type="text"
                  required
                  name="Name"
                  id="Name"
                  placeholder="Enter your full-name..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleUserInput}
                  value={userDetails.Name}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  placeholder="Enter your Email..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleUserInput}
                  value={userDetails.email}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  required
                  name="password"
                  id="password"
                  placeholder="Enter your password..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleUserInput}
                  value={userDetails.password}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  required
                  name="Address"
                  id="Address"
                  placeholder="Enter your Address..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleUserInput}
                  value={userDetails.Address}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  required
                  name="role"
                  id="role"
                  placeholder="Enter your User Role..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleUserInput}
                  value={userDetails.role}
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                type="submit"
              >
                Create Account
              </button>
            </form>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Store Management
          </h3>
          <button
            onClick={() => setIsStoreFormVisible(!isStoreFormVisible)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
          >
            {isStoreFormVisible ? "Close" : "Create Store"}
          </button>
          {isStoreFormVisible && (
            <form
              onSubmit={handleStoreFormSubmit}
              className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-auto"
            >
              <h1 className="text-center text-2xl font-bold mb-6">
                Create Store
              </h1>
              <div className="mb-6">
                <input
                  type="text"
                  required
                  name="Name"
                  id="StoreName"
                  placeholder="Enter store name..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleStoreInput}
                  value={storeDetails.Name}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  required
                  name="email"
                  id="StoreEmail"
                  placeholder="Enter store email..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleStoreInput}
                  value={storeDetails.email}
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  required
                  name="Address"
                  id="StoreAddress"
                  placeholder="Enter store address..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleStoreInput}
                  value={storeDetails.Address}
                />
              </div>
              <div className="mb-6">
                <input
                  type="number"
                  required
                  name="rating"
                  id="rating"
                  placeholder="Enter store rating..."
                  className="w-full bg-gray-100 px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
                  onChange={handleStoreInput}
                  value={storeDetails.rating}
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                type="submit"
              >
                Create Store
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
