import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()


const app = express()

const port = 8000

// connected to database(mongodb)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to mongodb"))
.catch(()=>console.log("failed to connected"))




// server running 
app.listen(port,()=>{

    console.log(`server running on ${port}`)
})