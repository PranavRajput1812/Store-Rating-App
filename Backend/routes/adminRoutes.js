import { Router } from "express";
import {dashBoardData} from '../controllers/adminController.js';
import {authorizedRoles, isLoggedIn} from "../middleware/authMiddleware.js";

const route = Router();

route.get('/admin-dashboard',isLoggedIn,authorizedRoles('ADMIN'),dashBoardData);

export default route;