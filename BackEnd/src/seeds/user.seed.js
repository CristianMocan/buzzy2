import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    {
        fullName: "Alex Pop",
        email: "alex.pop@gmail.com",
        password: "Alex123456",
        profilePic: ""
    },
    {
        fullName: "Andrei Mureșan",
        email: "andrei.muresan@gmail.com",
        password: "Andrei123456",
        profilePic: ""
    },
    {
        fullName: "David Rusu",
        email: "david.rusu@gmail.com",
        password: "David123456",
        profilePic: ""
    },
    {
        fullName: "Matei Popescu",
        email: "matei.popescu@gmail.com",
        password: "Matei123456",
        profilePic: ""
    },
    {
        fullName: "Vlad Ionescu",
        email: "vlad.ionescu@gmail.com",
        password: "Vlad123456",
        profilePic: ""
    },
    {
        fullName: "Radu Moldovan",
        email: "radu.moldovan@gmail.com",
        password: "Radu123456",
        profilePic: ""
    },
    {
        fullName: "Sorin Dumitru",
        email: "sorin.dumitru@gmail.com",
        password: "Sorin123456",
        profilePic: ""
    },
    {
        fullName: "Mihai Stan",
        email: "mihai.stan@gmail.com",
        password: "Mihai123456",
        profilePic: ""
    },
    {
        fullName: "Robert Florea",
        email: "robert.florea@gmail.com",
        password: "Robert123456",
        profilePic: ""
    },
    {
        fullName: "Cristian Pavel",
        email: "cristian.pavel@gmail.com",
        password: "Cristian123456",
        profilePic: ""
    }
];


const seedDataBase = async () =>{
    try{
        await connectDB()
        await User.insertMany(seedUsers)
        console.log("DataBase seeded successfully")
    }catch(error){
        console.error("Error seeding database", error);
    }
}

seedDataBase();