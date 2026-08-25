import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './lib/socket.js'
import { connectDB } from './lib/db.js'
dotenv.config()

app.use(cors({
    origin: "https://buzzy1-fawn.vercel.app",
    credentials: true,
}))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)


const port = process.env.PORT || 5001
server.listen(port, ()=>{
    console.log(`Server running on  https://localhost:${port}`)
    connectDB();
})