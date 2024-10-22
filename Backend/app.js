import express from 'express'
import cors from 'cors'   
import connectToDB from './config/dbConnection.js';
import userRoute from './routes/userRoutes.js';
import storeRoute from './routes/StoreRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();



//Db Connection
connectToDB();


//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials:true 
}))
app.use(cookieParser());
app.use(morgan('dev'));

//Routes
app.use('/ping',(req,res)=>{
    res.status(200)
    res.send('pong')       // for testing purpose
})

app.use('/api/v1/user',userRoute);
app.use('/api/v1/store',storeRoute);
app.use('/api/v1/admin',adminRoutes)
app.all('*',(req,res)=>{    // if somebody enters url other than any route defined here 
    res.status(404).send(`Oops ! Page 404 not found !`)
})


export default app;