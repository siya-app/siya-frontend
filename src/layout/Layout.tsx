import Header from "./Header";
import Footer from "./BottomNavBar";
import { usePageLoadMetrics } from "../hooks/usePageLoadMetrics"; 

//changed class of main to no padding/margin for the sliders to look cool - Laia
export default function Layout({ children }: { children: React.ReactNode }) {
  usePageLoadMetrics(); // Hook per mesurar el temps de càrrega de pàgines SPA
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow m-0 mb-12 overflow-hidden siyaDark-text">
        {children}
      </main>
      <Footer />
    </div>
  );
}
