import "./App.css";
import "./index.css";
import Layout from "./layout/Layout";
import { UserLocationProvider } from "./context/UserLocationProvider";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { TerraceProvider } from "./context/filteredTerraces.context";
import { UserProvider } from "./context/filteredUsers.context";
import { FilterProvider } from './context/FilterContext';

const queryClient = new QueryClient();

function App() {
  return (
    <UserLocationProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </AuthProvider>
      </QueryClientProvider>
    </UserLocationProvider>
  )
}

export default App;
