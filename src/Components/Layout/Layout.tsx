import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Slidebar/Slidbar";
import { useState } from "react";
import Footer from "../Footer/Footer";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      <div className="hidden md:block md:w-1/6 lg:w-1/7 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 h-screen overflow-y-auto">
        <Navbar />

        <button
          className="md:hidden fixed top-4 left-4 bg-amber-500 text-white p-3 rounded-full shadow-lg 
                     hover:bg-amber-600 transition-all duration-300 z-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-white bg-opacity-50 z-40"
            onClick={toggleSidebar}
          >
            <div 
              className="w-3/4 sm:w-2/3 md:w-1/3 bg-white h-full shadow-lg p-6 relative z-50"
              onClick={(e) => e.stopPropagation()} 
            >
              <Sidebar />
            </div>
          </div>
        )}

        <div className="p-4">
          <Outlet />
        </div>
        
        <Footer />
      </div>
    </div>
  );
}
