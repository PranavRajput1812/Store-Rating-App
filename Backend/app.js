import express from 'express'
import cors from 'cors'   
import connectToDB from './config/dbConnection.js';
import errorMiddleware from './middleware/errorMiddleware.js'
import userRoute from './routes/userRoutes.js';
import storeRoute from './routes/adminRoutes.js';
import cookieParser from 'cookie-parser';
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

//Routes
app.use('/ping',(req,res)=>{
    res.status(200)
    res.send('pong')       // for testing purpose
})

app.use('/api/v1/user',userRoute);
app.use('/api/v1/store',storeRoute);

app.all('*',(req,res)=>{    // if somebody enters url other than any route defined here 
    res.status(404).send(`Oops ! Page 404 not found !`)
})

// single middleware that can handle all the errors 
app.use(errorMiddleware)  
export default app;