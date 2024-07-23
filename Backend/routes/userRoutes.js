import { Router } from "express";
import { changePassword, login, logout, register } from "../controllers/userController.js";
import {authorizedRoles, isLoggedIn} from "../middleware/authMiddleware.js";


const router = Router();

//Routes
router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);
router.post('/change-password',isLoggedIn,changePassword);

export default router;