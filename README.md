# MERN Stack Rating Platform

Welcome to the MERN Stack Rating Platform! This web application allows users to rate stores, view ratings, and manage user roles. It leverages the power of the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. Whether you're an admin, a normal user, or a store owner, this platform provides a comprehensive set of functionalities tailored to your needs.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [User Personas and Functionalities](#user-personas-and-functionalities)
- [Validations](#validations)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Tech Stack

- **Backend:** Node.js and Express.js
- **Database:** MongoDB 
- **Frontend:** React.js 

## Requirements

We aim to build a web application where users can rate any registered store with ratings ranging from 1 to 5. The platform supports different user roles with specific functionalities.

## User Personas and Functionalities

### System Admin

- **Add Stores, Users, and Admin Users:** Manage the addition of stores and users.
- **Dashboard:** View total numbers of users, stores, and ratings.
- **User Addition Form:** Fields include Name, Email, Password, and Address.
- **Store Addition Form:** Fields include Name, Email,Address and Rating.
- **Store Listing Display:** Fields include Name, Email, Address, and Rating.
- **User Listing Display:** Fields include Name, Email, Address, and Role.
- **Filter Options:** Filter by Name, Email, Address, and Role.
- **User Details:** View user details including Name, Email, Address, Role
- **Logout:** Log out of the system.

### Normal User

- **Login and Signup:** Log in or sign up with fields for Name, Email, Address, and Password.
- **Change Password:** Change the password after login.
- **View Registered Stores:** View all registered stores.
- **Search Stores:** Search stores by name and address.
- **Store Listing:** View Name, Address, Overall Ratings, and personal rating.
- **Submit and Modify Ratings:** Submit and modify ratings (1 to 5).
- **Logout:** Log out of the system.

### Store Owner

- **Login:** Log in to the platform.
- **Change Password:** Change the password after login.
- **View Submitted Ratings:** View ratings submitted for their store.
- **Average Rating:** See the average rating for their store.
- **Logout:** Log out of the system.

## Validations

- **Name:** 20-60 characters
- **Address:** Up to 400 characters
- **Password:** 8-16 characters with at least 1 uppercase letter and 1 special character
- **Email:** Must be a valid email address

## Features

- **Enhanced User Experience:** The platform is designed to be intuitive and user-friendly.
- **Best Practices:** Followed in both frontend and backend development.
- **Database Schema:** Designed with best practices for efficiency and scalability.

## Installation

To get started with the MERN Stack Rating Platform:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/mern-rating-platform.git
    cd mern-rating-platform
    ```

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**

    ```bash
    cd ./frontend/vite-project
    npm install
    ```

4. **Start the backend server:**

    ```bash
    cd ./Backend
    npm run start
    ```

5. **Start the frontend server:**

    ```bash
    cd ./frontend/vite-project
    npm run dev
    ```

## Usage

1. **Access the web application:**
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

2. **Sign up and log in:**
   Create an account or log in with existing credentials.

## Creating Users

 **Add Admin User through Database:**
   - Open your MongoDB client or terminal.
   - Insert an admin user into the `users` collection with the role set to 'admin'. For example:

    ```json
    {
      "Name": "Admin Name",
      "email": "admin@example.com",
      "password": "adminPassword123!",
      "role": "ADMIN",
      "Address": "Admin Address"
    }
    ```

4. **Use the functionalities:**
   Depending on your user role, you can add stores, submit ratings, view dashboards, and more.

## Contributing

We welcome contributions! Please create a pull request or open an issue for any improvements or bug fixes.



