import './App.css'
import Layout from './layout/Layout'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/UserProfile'
import FilterPage from './pages/FilterPage'
import BookingPage from './pages/BookingPage'

function App() {

  return (
    <Layout>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/buscar-terraza" element={<FilterPage />} />
        <Route path="/reservar" element={<BookingPage />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
        
      </Routes>
    </Layout>
  )
}

export default App
