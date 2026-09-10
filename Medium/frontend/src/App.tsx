// import { useState } from 'react'
import{ BrowserRouter , Route , Routes } from 'react-router-dom'
import { SignupComponent } from './pages/Signup'
import { SigninComponent } from './pages/Signin'
import { BlogComponent } from './pages/Blog'
import { BlogsComponent } from './pages/Blogs'
import { PublishComponent } from './pages/publish'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignupComponent/>} ></Route>
          <Route path='/signin' element={<SigninComponent/>} ></Route>
          <Route path='/blogs' element={<BlogsComponent/>} ></Route>
          <Route path='/blog/:id' element={<BlogComponent/>} ></Route>
          <Route path='/publish' element={<PublishComponent/>} ></Route>
        </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
