import React from "react";
import { Link } from "react-router-dom";
import search from "../assets/chercher.png";

function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-auto max-w-7xl mx-auto mt-2 bg-gray-100 bg-opacity-50 backdrop-filter backdrop-blur-3xl p-4 rounded-full shadow-lg z-50">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className="flex items-center justify-between font-bold text-sm text-gray-600 uppercase no-underline">
              <li>
                <Link className="m-2" to="/">
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-800 px-4"
                  to="/Entree"
                >
                  Entrée
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-800 px-4"
                  to="/Sortie"
                >
                  Sortie
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center bg-transparent rounded-full">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full bg-gray-200 text-gray-800 py-1 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Recherche..."
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img src={search} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
