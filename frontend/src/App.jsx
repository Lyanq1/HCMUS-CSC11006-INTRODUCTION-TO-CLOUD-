
import { Route, Routes } from 'react-router-dom'
import Task from './components/Task/Task'


function App() {

  return (
    <Routes> 
      <Route path="/" element={<Task />} />

     
   </Routes>
  )
}

export default App
