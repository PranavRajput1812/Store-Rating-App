import { configDotenv } from "dotenv"
import store  from "../models/storeModel.js";
import user from "../models/userModel.js";
configDotenv();



const dashBoardData = async (req, res) => {
    try {
        let users = await user.countDocuments() ||0;
        
        let stores = await store.countDocuments()||0;

        let userSubmitedRating = await user.find({isSumbmitedRating:true}).countDocuments()||0;

        res.status(200).json({
            success: true,
            message: 'User count retrieved successfully!',
            users,
            stores,
            userSubmitedRating
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export {dashBoardData};