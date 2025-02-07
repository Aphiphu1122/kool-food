import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main 
      className="flex flex-col min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('/Bg2.jpg')" }}
    >
      <Navbar />

      {/* Content Area */}
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg shadow-xl rounded-xl p-8 text-center max-w-md">
          <h1 className="text-gray-900 text-4xl font-bold">WELCOME KOOLFOOD</h1>
          <p className="text-gray-700 mt-2">สัมผัสประสบการณ์อาหารสุดพิเศษที่ไม่เหมือนใคร</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
