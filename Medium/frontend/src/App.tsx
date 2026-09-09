// import { useState } from 'react'
import{ BrowserRouter , Route , Routes } from 'react-router-dom'
import { SignupComponent } from './pages/Signup'
import { SigninComponent } from './pages/Signin'
import { BlogComponent } from './pages/Blog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignupComponent/>} ></Route>
          <Route path='/signin' element={<SigninComponent/>} ></Route>
          <Route path='/blog/:id' element={<BlogComponent/>} ></Route>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
