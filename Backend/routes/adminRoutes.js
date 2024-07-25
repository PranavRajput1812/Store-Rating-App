import { Router } from "express";
import {dashBoardData} from '../controllers/adminController.js';
import {authorizedRoles, isLoggedIn} from "../middleware/authMiddleware.js";
import { getAllUser } from "../controllers/userController.js";
const route = Router();

route.get('/admin-dashboard',isLoggedIn,authorizedRoles('ADMIN'),dashBoardData);
route.get('/getAllusers',isLoggedIn,authorizedRoles('ADMIN'),getAllUser);

export default route;