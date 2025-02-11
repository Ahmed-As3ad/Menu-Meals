import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div>
        <div className="flex justify-between items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link to={'/'}><h2 className="text-2xl font-bold text-center">Recipe</h2></Link>
          <h2 className="text-2xl text-blue-700 font-bold text-center">
            Route
          </h2>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4  border-t border-gray-300">
        <div className="w-full flex justify-center">
          <div className="text-center">
            <p className="text-md text-gray-500 font-sans">
              © 2025 Ahmed Assaad™. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
