import { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Home } from './pages/Home'
import { Placeholder } from './pages/Placeholder'
import { NotFound } from './pages/NotFound'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/placeholder" element={<Placeholder/>}/>
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
