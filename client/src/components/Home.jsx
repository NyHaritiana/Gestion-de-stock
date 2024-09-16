import React, { useState } from "react";
import Navbar from "./Navbar";
import "../App.css";
import materiel from "../assets/materiel.jpg";

function Home() {
  const [datatitle, setDatatitle] = useState([
    { id: 1, libelle: "Matériels" },
    { id: 2, libelle: "Clés" },
    { id: 3, libelle: "Accessoires" },
    { id: 4, libelle: "Équipements" },
    { id: 5, libelle: "Fournitures" },
  ]);
  const [datafirstarticle, setDataarticle] = useState([
    { id: 1, title: "Matériels", image: {materiel} },
    { id: 2, title: "Clés", image: {materiel} },
    { id: 3, title: "Accessoires", image: {materiel} },
    { id: 1, title: "Équipements", image: {materiel} },
  ]);
  const [datasecondarticle, setDatasecondarticle] = useState([
    { id: 1, title: "Équipements" },
    { id: 2, title: "Fournitures" },
    { id: 3, title: "Autres" },
  ]);
  const [datahead, setDatahead] = useState([
    { id: 1, libelle: "Designation" },
    { id: 2, libelle: "Catégorie" },
    { id: 3, libelle: "Quatité" },
    { id: 4, libelle: "Unité" },
    { id: 5, libelle: "N° Comptable" },
    { id: 6, libelle: "Ref. Facture" },
  ]);
  return (
    <>
      {/* ---------navbar------------ */}
      <Navbar />
      {/* -----------title----------- */}
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-12">
          <a
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            href="#"
          >
            Gestion de Stock
          </a>
          <p className="text-lg text-gray-600">
            Direction du Système d' Information
          </p>
        </div>
      </header>
      {/* -------------navig----------- */}
      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <div className="scroll-container">
              {datatitle.map((item) => (
                <a
                  href="#"
                  className="scrollh hover:bg-gray-400 rounded py-2 px-4 mx-2"
                  key={item.id}
                >
                  {item.libelle}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex flex-wrap py-6">
        {datafirstarticle.map((item) => (
          <section className="w-full mx-auto md:w-2/5 px-3">
            <article className="flex flex-col shadow my-4" key={item.id}>
              <a href="#" className="hover:opacity-75"></a>
              <div className="bg-white flex flex-col justify-start p-6">
                <img src={item.image} alt={item.title} />
                <a
                  href="#"
                  className="text-blue-700 text-sm text-center font-bold uppercase pb-4"
                >
                  {item.title}
                </a>
                {/* <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      {datahead.map((item) => (
                        <th
                          scope="col"
                          className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                          key={item.id}
                        >
                          {item.libelle}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table> */}
              </div>
            </article>
          </section>
        ))}
      </div>

      <footer class="w-full border-t bg-white pb-12">
        <div
          class="relative w-full flex items-center invisible md:visible md:pb-12"
          x-data="getCarouselData()"
        >
          <button
            class="absolute bg-blue-800 hover:bg-blue-700 text-white text-2xl font-bold hover:shadow rounded-full w-16 h-16 ml-12"
            x-on:click="decrement()"
          >
            &#8592;
          </button>
          <button
            class="absolute right-0 bg-blue-800 hover:bg-blue-700 text-white text-2xl font-bold hover:shadow rounded-full w-16 h-16 mr-12"
            x-on:click="increment()"
          >
            &#8594;
          </button>
        </div>
        <div class="w-full container mx-auto flex flex-col items-center">
          <div class="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
            <a href="#" class="uppercase px-3">
              About Us
            </a>
            <a href="#" class="uppercase px-3">
              Privacy Policy
            </a>
            <a href="#" class="uppercase px-3">
              Terms & Conditions
            </a>
            <a href="#" class="uppercase px-3">
              Contact Us
            </a>
          </div>
          <div class="uppercase pb-6">&copy; myblog.com</div>
        </div>
      </footer>
    </>
  );
}

export default Home;
