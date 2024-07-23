import mongoose from "mongoose";
import { config } from 'dotenv';
config()


// kepping less strictness if wrong query occur  
mongoose.set('strictQuery',false)

const connectToDB = async () =>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected with DB: ${connection.host}`);
        
    } catch (error) {
        console.log(`Error  in connecting with DB: ${error}`);
        process.exit(1)
    }
}

export default connectToDB