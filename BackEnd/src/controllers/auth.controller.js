import User from "../models/user.model.js"  
import { generateToken } from "../lib/utils.js";
import bycript from "bcryptjs"
export const signup = async (req,res) =>{
    const {fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password){
            return res.status(400).send({message:"Please fill all the fields"})
        }
        if (password.length < 6) {
            return res.status(400).send({message:"Password must be at least 6 characters"})
        }
        const user = await User.findOne({email})
        if (user){
            return res.status(400).send({message: "User already exists"})
        }
        const salt = await bycript.genSalt(10)
        const hashedPassword = await bycript.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,   
                profilePic: newUser.profilePic,
            })
        }
    }catch(error){
        console.log("Error in signup controller", error)
        res.status(500).send({message:"Error is signup route"})
    }
}

export const login = (req,res) =>{
    res.status(200).send("login route")
}