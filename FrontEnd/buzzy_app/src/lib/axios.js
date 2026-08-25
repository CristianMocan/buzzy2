import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://buzzy1.onrender.com/api",
    withCredentials: true
})