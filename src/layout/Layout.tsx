import Header from "./Header";
import Footer from "./Footer";

//changed class of main to no padding/margin for the sliders to look cool - Laia
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
