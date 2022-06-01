import React from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { auth } from "./firebase"
import Login from './components/Login';
import Chats from './components/Chats';
import PrivateChat from "./components/PrivateChat";
import Messages from "./components/Messages";

function App() {
  const navigate = useNavigate()
  const handleLogout = async () => {
      await auth.signOut()
      navigate('/')
  }

  return (
    <div>
      <AuthProvider>
        <div className="navbar">
            <Link className="logoTab" to="/">Letschat</Link>
            <Link className="messagesLink" to="/messages">Messages</Link>
            <button onClick={handleLogout} className="logoutTab">
                Logout
            </button>
        </div>
        <Routes>
            <Route path="/" element={<Login/>}/> 
            <Route path="/chats/:companion" element={<PrivateChat/>}/>
            <Route path="/chats" element={<Chats/>}/>
            <Route path="/messages" element={<Messages/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App