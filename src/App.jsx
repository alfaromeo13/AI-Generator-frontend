import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Generator } from './pages/Generator'
import { Login } from './pages/Login'
import { Placeholder } from './pages/Placeholder'
import { NotFound } from './pages/NotFound'

import './index.css'

function App(
  
) {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/generator" element={<Generator/>}/>
      <Route path="/signin" element={<Login/>}/>
      <Route path="/placeholder" element={<Placeholder/>}/>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
