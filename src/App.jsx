import {Routes,Route} from 'react-router-dom'

import "./app.css"
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/login" element={<Login type="Login"/>} />
      <Route path="/signup" element={<Login type="Signup"/>} />
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
