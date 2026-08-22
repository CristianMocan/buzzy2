import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import {toast} from 'react-hot-toast'

export const useAuthStore = create((set) =>({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () =>{
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
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
        }
        catch(error){
            toast.error("A aparut o problema")
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out succesfully")
        }catch(error){
            toast.error("Eroare la logout")
        }
    }
}))