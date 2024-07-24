import mongoose,{model} from "mongoose";
import { config } from 'dotenv'
config()



const storeSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : [true,`Name is required feild`],
        trim:true,
        maxLength:60,
        minLength:20
    },
    email:{
        type:String,
        required: [true,`Email is a required field`] ,
        trim: true ,
        unique: true ,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address'
          ] 

    },
     
    Address:{
        type :String,
        required : [true,`Address is a required field`],
        trim : true,
        maxLength: 400

    },
   overallRating: { type: Number, default: 0 },
   ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true,min:1,max:5},
      
    }
  ],
  owner : {type:mongoose.Schema.Types.ObjectId}
},{
    timestamps:true

}); 

const store = model('Store',storeSchema)

export default store;