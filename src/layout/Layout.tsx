import Header from "./Header";
import Footer from "./BottomNavBar";

//changed class of main to no padding/margin for the sliders to look cool - Laia
export default function Layout({ children }: { children: React.ReactNode }) {
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
