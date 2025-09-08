import "./App.css";
import "./index.css";
import Layout from "./layout/Layout";
import { UserLocationProvider } from "./context/UserLocationProvider";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { TerraceProvider } from "./context/filteredTerraces.context";
import { UserProvider } from "./context/filteredUsers.context";
import { FilterProvider } from "./context/FilterContext";
import { ReviewProvider } from "./context/reviews.context";
import { useEffect } from "react";
import { initWebVitals } from "./monitoring";

const queryClient = new QueryClient();

function App() {
  // Inicialitza la monitorització de web vitals
  useEffect(() => {
    initWebVitals();
  }, []);

  return (
    <ReviewProvider>
      <UserProvider>
        <TerraceProvider>
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
        </TerraceProvider>
      </UserProvider>
    </ReviewProvider>
  );
}

export default App;
