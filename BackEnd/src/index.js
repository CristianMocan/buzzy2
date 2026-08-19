import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


const port = process.env.PORT || 5001
app.listen(port, ()=>{
    console.log(`Server running on  https://localhost:${port}`)
    connectDB();
})