import './App.css';
import './index.css';
import Layout from './layout/Layout'
import { UserLocationProvider } from './context/UserLocationProvider'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <UserLocationProvider>
        <Layout>
          <AppRoutes />
        </Layout>
    </UserLocationProvider>
  )
}

export default App
