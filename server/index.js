import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRoute from "./routes/UserRoute.js"
//console.log(data.length)
const app=express()
dotenv.config() 
const port=process.env.PORT || 8001
const mongo = process.env.MONGO

const connect= async()=>{
    try{
        await mongoose.connect(mongo)
    }
    catch(err){
        console.log(err)
    }
}

mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDB")
})

mongoose.connection.off("disconnected",()=>{
    console.log("Disconnected from MongoDB")
})

app.use(cors({
    origin: "https://recipez-m27.onrender.com", // frontend URI (ReactJS)
    methods:["GET","POST","PATCH","DELETE"],
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use("/user",userRoute)
app.listen(port,()=>{
    connect()
    console.log(`Server running on ${port}`)
})
