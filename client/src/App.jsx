import { Button, Link } from '@chakra-ui/react'
import { useState } from 'react'
import Home from './Pages/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Playlists from './Pages/Playlists'
import Auth from './Pages/Auth'

function App() {

  return (
    <>
    <Routes>
      <Route path='/Home' element={<Home />} />
      <Route path='/Playlists' element={<Playlists />} />
      <Route path='/Auth' element={<Auth />} />
    </Routes>
  </>
  )
}

export default App
