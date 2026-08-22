import Navbar from '../src/components/Navbar'
import {Routes, Route} from 'react-router-dom'
import {Loader} from 'lucide-react'
import { Navigate } from 'react-router-dom'
import HomePage from '../src/pages/HomePage'
import SignupPage from '../src/pages/SignupPage'
import LoginPage from '../src/pages/LoginPage'
import SettingsPage from '../src/pages/SettingsPage'
import ProfilePage from '../src/pages/ProfilePage'
// import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'
function App() {
    const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
    useEffect(() => {
        checkAuth()
    }, [checkAuth])
    console.log({authUser});
    if(isCheckingAuth && !authUser) return (
        <div className='flex items-center justify-center h-screen'>
            <Loader className="size-10 animate-spin"/>
        </div>
    )
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
                <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>} />
                <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
            </Routes>
            <Toaster/>
        </div>
    );
}

export default App;