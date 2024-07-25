


import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install and use React Router for navigation
import homeImage from '../assets/HomePageImage.jpg';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4 px-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Store Rating App</Link>
        </div>
        <div className="space-x-4">
          <Link 
            to="/login"
            className="bg-green-500 py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Login
          </Link>
          <Link 
            to="/signup"
            className="bg-blue-500 py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex flex-1 p-20">
        <div className="flex flex-col justify-center w-1/2 p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Store Rating App</h1>
          <p className="text-lg text-gray-600 mb-6">Rate and review your favorite stores with ease!</p>
          {/* <div className="flex space-x-4">
            <Link 
              to="/signup"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
            <Link 
              to="/login"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Login
            </Link>
          </div> */}
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img 
            src={homeImage}
            alt="Store Rating"
            className="w-3/4 h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
