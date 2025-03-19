import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";


console.log(process.env.JWT_SECRET)
//app config:
const app = express();
const port = process.env.PORT || 5000
connectDB()
connectCloudinary()
//middleware
app.use(express.json())
app.use(cors())

//API Endpoints  
app.use('/api/admin' ,adminRouter)
//localhost:4000/api/admin

app.get('/',(req,res)=>{
    res.send('API WORKING')

})

app.listen(port, ()=> console.log("Server started at:",port))