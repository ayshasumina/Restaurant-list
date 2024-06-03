import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import Footer from './components/Footer'

function App() {


  return (
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/:id/view" element={<View />}></Route>
      <Route path='/*' element={<Navigate to={'/'}/>}>

      </Route>
    </Routes>
    </BrowserRouter>
     
    
  )
}

export default App