import './App.css'
import Layout from './layout/Layout'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <Layout>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />

      </Routes>
    </Layout>
  )
}

export default App
