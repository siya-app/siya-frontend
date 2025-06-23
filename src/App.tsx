import './App.css';
import './index.css';
import Layout from './layout/Layout'
import { UserLocationProvider } from './context/UserLocationProvider'
import AppRoutes from './routes/AppRoutes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { FilterProvider } from './context/FilterContext';

const queryClient = new QueryClient();

function App() {

  return (
    <FilterProvider>
    <UserLocationProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </QueryClientProvider>
    </UserLocationProvider>
    </FilterProvider>
  )
}

export default App
