import Navbar from '../src/components/Navbar'
import {Routes, Route} from 'react-router-dom'
import HomePage from '../src/pages/HomePage'
import SignupPage from '../src/pages/SignupPage'
import LoginPage from '../src/pages/LoginPage'
import SettingsPage from '../src/pages/SettingsPage'
import ProfilePage from '../src/pages/ProfilePage'
function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/settings" element={<SettingsPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
            </Routes>
        </div>
    );
}

export default App;