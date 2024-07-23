import express from 'express'
import cors from 'cors'   
import connectToDB from './config/dbConnection.js';
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


//Routes
app.use('/ping',(req,res)=>{
    res.status(200)
    res.send('pong')       // for testing purpose
})

export default app;