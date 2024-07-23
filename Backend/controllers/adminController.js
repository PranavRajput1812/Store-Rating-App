import AppError from "../utils/errorUtils.js"
import { configDotenv } from "dotenv"
import store  from "../models/storeModel.js";
configDotenv();

const addStore = async(req,res)=>{
    const{Name,email,Address,rating} = req.body;

    if(!Name || !email ||!Address){
        return next(new AppError(500,`All fields are required`)) 
    }
    const storeExists = await store.findOne({email})
    if(storeExists){
        return next(new AppError(500,`User already exists !`))
    }
    const newStore = await store.create({
        Name,
        email,
        Address,
        rating
    })
    console.log(newStore);
    if(!newStore){
        return next(new AppError(500,`Store registration failed, please try again`))
    }

       // save user in DB
       await newStore.save();
       res.status(200).json({
        success: true ,
        message: `Store registered successfully`, 
        newStore
    })
}

export {addStore};