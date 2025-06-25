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

const queryClient = new QueryClient();

function App() {
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
