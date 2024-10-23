import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleIconClick = () => {
    setIsLogoutVisible((prev) => !prev);
  };
  const handleLogout = () => {
    navigate("/");
    console.log("Déconnexion...");
  };
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-auto max-w-7xl mx-auto mt-2 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-3xl p-4 rounded-full shadow-lg z-50">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className="flex items-center justify-between font-bold text-sm text-gray-600 uppercase no-underline">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "text-blue-800 m-2" : "m-2 hover:text-blue-800"
                  }
                >
                  <i className="fas fa-home"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Entree"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-800 hover:text-blue-900 px-4"
                      : "hover:text-blue-800 px-4"
                  }
                >
                  Entrée
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Sortie"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-800 hover:text-blue-900 px-4"
                      : "hover:text-blue-800 px-4"
                  }
                >
                  Sortie
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="flex items-center bg-transparent rounded-full">
            <div className="relative w-full bg-gray-500 p-2 rounded-full">
              <FaUser
                size={20}
                style={{ color: "white" }}
                onClick={handleIconClick}
              />
              {isLogoutVisible && (
                <div className="absolute right-1 transform -translate-x-4 mt-2 p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition flex flex-col items-center">
                  <h1 className="text-center text-lg font-bold">DSI</h1>
                  <p className="text-xs border rounded-lg px-2 text-center">
                    dsimfa@gmail.com
                  </p>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm bg-gray-800 p-2 rounded-lg mt-8 hover:bg-gray-900" // Utiliser flex pour le bouton
                  >
                    <FaSignOutAlt className="mr-2" />{" "}
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
