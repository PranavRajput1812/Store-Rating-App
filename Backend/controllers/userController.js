import AppError from "../utils/errorUtils.js"
import user from "../models/userModel.js"
import { configDotenv } from "dotenv"
//import studentData from "../models/studentData.js"
//import Company from '../models/companyModel.js'
import store from "../models/storeModel.js"


configDotenv()

const cookieOptions = {
    maxAge: 1*24*60*60*1000, // 1 days
    httpOnly: true,
    secure: false
}

const register = async(req,res,next) =>{
    
    const {Name,email,password,Address,role} = req.body

    if(!Name || !email || !password ||!Address){
        return next(new AppError(500,`All fields are required`)) 
    }

    const userExists = await user.findOne({email})

    if(userExists){
        return next(new AppError(500,`User already exists !`))
    }
    

    const newUser = await user.create({
        Name,
        email,
        password,
        Address,
        role
    })

    if(!newUser){
        return next(new AppError(500,`User registration failed, please try again`))
    }

    // save user in DB
    await newUser.save()
  
    // token generation
    const token = await newUser.generateJWTtoken()

    // put token into cookie
    res.cookie('token',token,cookieOptions) 

    newUser.password = undefined

    res.status(200).json({
        success: true ,
        message: `User registered successfully`, 
        newUser
    })
}


const login = async (req,res,next) =>{

    try {
        const {email,password} = req.body

        if(!email || !password){
            return next(new AppError(500,`All fields are required`))
        }

        // getting password explicitly because it was selected as false in schema
        const existingUser = await user.findOne({
            email
        }).select('+password')  

        if(!existingUser || !(await existingUser.comparePassword(password))){
            return next(new AppError(500,`Email & Password doesnt match`))
        }

        const token = await existingUser.generateJWTtoken()
        res.cookie('token',token,cookieOptions)

        existingUser.password = undefined
        
        res.status(200).json({
            success: true,
            message: `User logged in successfully`,
            existingUser
        })
    } catch (e) {
        return res.status(500).json({
            success: false ,
            message: e.message
        })
    }
    

}

const logout = (req,res) =>{
    res.cookie('token',null,{
        secure: true ,
        maxAge: 0 ,
        httpOnly: true
    })

    res.status(200).json({
        success :true ,
        message: `User logged out successfully`
    })
}


const getUserById = async (req, res) => {
    try {
      const userById = await user.findById(req.params.id).select('-password');
      res.status(200).json({
        success :true ,
        message: `User found successfully`,
        userById
    })
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


const changePassword = async (req,res,next) =>{
    const {oldPassword, newPassword} = req.body
    const {id} = req.user
    
    if(!oldPassword || !newPassword){
        return next(new AppError(500,`All fields are mandatory`))
    }

    const userExists = await user.findById(id).select('+password')

    if(!userExists){
        return next(new AppError(500,`User doesnt exist`))
    }

    const isPasswordValid = await userExists.comparePassword(oldPassword)

    if(!isPasswordValid){
        return next(new AppError(500,`Old password invalid`))
    }

    userExists.password = newPassword   
    await userExists.save()

    userExists.password = undefined

    res.status(200).json({
        success: true ,
        message: `Password changed successfully`
    })
}



export {register,login,logout,changePassword,getUserById}