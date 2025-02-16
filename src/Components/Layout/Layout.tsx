import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Slidebar/Slidbar";
import { useState } from "react";
import Footer from './../Footer/Footer';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden md:block md:w-1/6 lg:w-1/7 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 h-screen overflow-y-auto">
        <Navbar />

        {/* <button
          className="md:hidden fixed top-4 left-4 bg-amber-500 text-white p-3 rounded-full shadow-lg 
                     hover:bg-amber-600 transition-all duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "✖" : "📜"}
        </button> */}

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="w-3/4 sm:w-2/3 md:w-1/3 bg-white h-full shadow-lg p-6">
              <Sidebar />
            </div>
          </div>
        )}

        <div className="">
          <Outlet />
        </div>
        <div className="">
        <Footer/>
        </div>
      </div>
    </div>
  );
}
