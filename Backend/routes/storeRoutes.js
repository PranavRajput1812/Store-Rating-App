import { Router } from "express";
import {addStore,storeListing,rateStore,getUserThatRateStore} from '../controllers/storeController.js'
import {authorizedRoles, isLoggedIn} from "../middleware/authMiddleware.js";


const router = Router();

//Routes
router.post('/add-Store',isLoggedIn,authorizedRoles('ADMIN'),addStore);
router.get('/store-listing',isLoggedIn,authorizedRoles('USER','ADMIN'),storeListing);
router.post('/rate/:storeId',isLoggedIn,authorizedRoles('USER'),rateStore);
router.get('/:email/user',isLoggedIn,authorizedRoles('StoreOwner'),getUserThatRateStore);

export default router;
