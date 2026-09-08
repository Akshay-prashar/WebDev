import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { Update } from './pages/Update';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/Signin" element={<Signin/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Update/:id" element={<Update/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
