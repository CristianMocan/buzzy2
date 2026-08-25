import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import {toast} from 'react-hot-toast'
import { io } from 'socket.io-client'

const baseURL = "http://localhost:5001";
export const useAuthStore = create((set, get) =>({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () =>{
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        }catch(error){
            console.log("Error is checkAuth",error)
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) =>{
        set({isSigningUp:true})
        try{
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser:res.data})
            toast.success("Account created succesfully")
            get().connectSocket()
        }
        catch(error){
            toast.error("A aparut o problema")
        }
        finally{
            set({isSigningUp:false})
        }
    },

    login: async (data)=>{
        set({isLoggingIng:true})
        try{
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser:res.data})
            toast.success("Succesfully Logged")
            get().connectSocket()
        }catch(error){
            toast.error("Eroare la logare")
        }
        finally{
            set({isLoggingIng:false})
        }
    },

    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out succesfully")
            get().disconnectSocket();
        }catch(error){
            toast.error("Eroare la logout")
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile:true})
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data})
            toast.success("Profile has been updated ")
        }catch(error){
    console.log("UPDATE PROFILE ERROR:", error);
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);

    toast.error("A aparut o eroare la updatarea imaginii");
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket: () =>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;
        const socket = io(baseURL, {
            query:{
                userId: authUser._id
            }
        })
        set({socket})
        socket.connect()
        socket.on("getOnlineUsers",(userIds) =>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket: () =>{
        if(get().socket?.connected) get().socket.disconnect();
    }
}))