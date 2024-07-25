MERN Stack Rating Platform

Welcome to the MERN Stack Rating Platform! This web application allows users to rate stores, view ratings, and manage user roles. It leverages the power of the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. Whether you're an admin, a normal user, or a store owner, this platform provides a comprehensive set of functionalities tailored to your needs.

#Table of Contents

Tech Stack
Requirements
User Personas and Functionalities
Validations
Features
Installation
Usage
Contributing
License
Tech Stack
Backend: Node.js-based backend framework
Database: MongoDB (non-relational) or any relational database
Frontend: React.js framework
Requirements
We aim to build a web application where users can rate any registered store with ratings ranging from 1 to 5. The platform supports different user roles with specific functionalities.

User Personas and Functionalities
System Admin
Add Stores, Users, and Admin Users: Manage the addition of stores and users.
Dashboard: View total numbers of users, stores, and ratings.
User Addition Form: Fields include Name, Email, Password, and Address.
Store Listing Display: Fields include Name, Email, Address, and Rating.
User Listing Display: Fields include Name, Email, Address, and Role.
Filter Options: Filter by Name, Email, Address, and Role.
User Details: View user details including Name, Email, Address, Role, and Rating (for Store Owners).
Logout: Log out of the system.
Normal User
Login and Signup: Log in or sign up with fields for Name, Email, Address, and Password.
Change Password: Change the password after login.
View Registered Stores: View all registered stores.
Search Stores: Search stores by name and address.
Store Listing: View Name, Address, Overall Ratings, and personal rating.
Submit and Modify Ratings: Submit and modify ratings (1 to 5).
Logout: Log out of the system.
Store Owner
Login: Log in to the platform.
Change Password: Change the password after login.
View Submitted Ratings: View ratings submitted for their store.
Average Rating: See the average rating for their store.
Logout: Log out of the system.
Validations
Name: 20-60 characters
Address: Up to 400 characters
Password: 8-16 characters with at least 1 uppercase letter and 1 special character
Email: Must be a valid email address
Features
Sorting: Tables support ascending/descending sorting by Name and Email.
Best Practices: Followed in both frontend and backend development.
Database Schema: Designed with best practices for efficiency and scalability.
Installation
To get started with the MERN Stack Rating Platform:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/mern-rating-platform.git
cd mern-rating-platform
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Start the backend server:

bash
Copy code
cd ../backend
npm start
Start the frontend server:

bash
Copy code
cd ../frontend
npm start
Usage
Access the web application:
Open your browser and navigate to http://localhost:3000.

Sign up and log in:
Create an account or log in with existing credentials.

Use the functionalities:
Depending on your user role, you can add stores, submit ratings, view dashboards, and more.

Contributing
We welcome contributions! Please create a pull request or open an issue for any improvements or bug fixes.