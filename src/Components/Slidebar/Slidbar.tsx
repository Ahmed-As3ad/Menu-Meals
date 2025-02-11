import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNavigation = (page: string) => {
    if (page === "All Meals") {
      navigate("/"); 
    } else if (page === "Ingredients") {
      // navigate("/ingredients");
    } else if (page === "Area") {
      // navigate("/area");
    }
  };

  return (
    <div className="bg-gray-50 shadow-lg w-full min-h-screen flex flex-col items-center py-6">
      <img src={logo} alt="Logo" className="w-24 sm:w-28 md:w-32 mb-6" />

      <div className="w-full flex flex-col items-center gap-4 px-6">
        {["All Meals", "Ingredients", "Area"].map((item) => (
          <button
            key={item}
            onClick={() => handleNavigation(item)}
            className="font-bold p-3 rounded-lg w-full border border-gray-300
                       cursor-pointer bg-gray-100 text-gray-800 
                       hover:bg-amber-400 hover:text-white transition-all duration-300
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
