import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="w-full py-4 bg-blue-600 shadow">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
              <li>
                <Link className="pr-6" to="/">
                  <i className="fas fa-home"></i>
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-200 hover:underline px-4"
                  to="/Entree"
                >
                  Entrée
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-gray-200 hover:underline px-4"
                  to="/Sortie"
                >
                  Sortie
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center text-lg no-underline text-white pr-6">
            <a className="" href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a className="pl-6" href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="pl-6" href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
