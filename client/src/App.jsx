import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AdminLogin from "./components/AdminLogin"

function App() {

  return (
   <Router>
    <Routes>
      <Route path = "/admin/login" element = {<AdminLogin/>}/>
    </Routes>
   </Router>
  )
}

export default App
