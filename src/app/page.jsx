import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
      </div>

      <Footer />
    </main>
  );
}
