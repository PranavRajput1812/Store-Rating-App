import mongoose,{model} from "mongoose";
import bcrypt from 'bcrypt'
import jwtToken from 'jsonwebtoken'
import { config } from 'dotenv'
config()



const userSchema = new mongoose.Schema({
    Name : {
        type : 'String',
        required : [true,`Name is required feild`],
        trim:true,
        maxLength:60,
        minLength:20
    },
    email:{
        type:'String',
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
    password:{
        type:'String',
        required: [true,`Password is a required field`] ,
        trim: true ,
        select : false   ,
        minLength : [8,`Password must be atleast of 6 characters`],
        
    },
    Address:{
        type :'String',
        required : [true,`Address is a required field`],
        trim : true,
        maxLength: 400

    },
    role:{
        type:'String',
        enum: ['USER','ADMIN','StoreOwner'],
        default: 'USER'
    },
},{
    timestamps:true

}); 



userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    // let hashedPassword 
    this.password = await bcrypt.hash(this.password,7)
   // this.password = hashedPassword.slice(0, 16);
})


// JWT TOKEN GENERATION
userSchema.methods = {
    generateJWTtoken: async function(){
        return await jwtToken.sign(
            {id:this._id, email: this.email, subscription: this.subscription, role: this.role, fullName: this.fullName},
            process.env.SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },
  
}

const user = model('User',userSchema)

export default user


