import React from "react"

import { Routes, Route } from "react-router-dom"


import Login from './components/Login'

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Routes>
        
        
        <Route path="/" element={<Login/>} /> 
      </Routes>
    </div>
  )
}

export default App