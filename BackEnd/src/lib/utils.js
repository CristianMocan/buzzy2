import jwt from "jsonwebtoken";

export const generateToken = (userId, res) =>{
    const token = jwt.sign(
        {userId}, 
        process.env.JWT_SECRET, 
        { expiresIn: "7D" }
    );
    res.cookie("jwt", token, { 
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        samesite: "none", // Prevents the browser from sending this cookie along with cross-site requests
        secure: process.env.NODE_ENV !== "development" // Set secure flag in production
    });
    return token;
}