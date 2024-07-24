import AppError from "../utils/errorUtils.js"
import { configDotenv } from "dotenv"
import store  from "../models/storeModel.js";
import user from "../models/userModel.js";
configDotenv();



const dashBoardData = async (req, res) => {
    try {
        const users = await user.find({});
        
        const stores = await store.find({});

        

        if (!userCount) {
            return res.status(500).json({
                success: false,
                message: 'Error!'
            });
        }
        res.status(200).json({
            success: true,
            message: 'User count retrieved successfully!',
            users,
            stores
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export {addStore,dashBoardData};