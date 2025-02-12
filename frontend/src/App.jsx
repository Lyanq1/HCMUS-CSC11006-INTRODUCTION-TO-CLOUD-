import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Task from './components/Task'


function App() {

  return (
    <Routes> 
      <Route path="/" element={<Task />} />

     
   </Routes>
  )
}

export default App
