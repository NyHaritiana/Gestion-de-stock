import React from "react";
import { Link } from "react-router-dom";
import search from "../assets/chercher.png";

function Navbar() {
  return (
    <>
      <nav className="w-full py-4 bg-tranparent shadow">
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
          <div className="flex items-center bg-transparent p-2 rounded-lg">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full bg-gray-200 text-gray-800 py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
