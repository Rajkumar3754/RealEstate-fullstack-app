import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from '../api/routes/user.route.js'
import authRouter from '../api/routes/auth.route.js'

dotenv.config()


const app = express()

const port = 8000

// connected to database(mongodb)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to mongodb"))
.catch(()=>console.log("failed to connected"))

app.use(express.json())




// server running 
app.listen(port,()=>{

    console.log(`server running on ${port}`)
})



app.use('/api/user',userRouter)

app.use('/api/auth',authRouter)