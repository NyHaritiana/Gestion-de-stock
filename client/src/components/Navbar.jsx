import React from "react";

function Navbar() {
  return (
    <>
      <nav className="w-full py-4 bg-blue-800 shadow">
        <div className="w-full container mx-auto flex flex-wrap items-center justify-between">
          <nav>
            <ul className="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
              <li>
                <a className="pr-6" href="#">
                  <i className="fas fa-home"></i>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200 hover:underline px-4"
                  href="#"
                >
                  Entrée
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gray-200 hover:underline px-4"
                  href="#"
                >
                  Sortie
                </a>
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
