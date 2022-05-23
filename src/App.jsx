import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Login from './components/Login';
import Chats from './components/Chats';

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <AuthProvider>
        <Routes>
            <Route path="/" element={<Login/>} /> 
            <Route path="/chats" element={<Chats/>}/>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App