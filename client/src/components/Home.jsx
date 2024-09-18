import React, { useState } from "react";
import Navbar from "./Navbar";
import "../App.css";
import materiel from "../assets/materiels.jpg";
import fourniture from "../assets/fournitures.jpg";
import materiels from "../assets/materiel.jpg";
import equipements from "../assets/equipements.jpg";

function Home() {
  const [datatitle, setDatatitle] = useState([
    { idTitle: 1, libelles: "Tous" },
    { idTitle: 2, libelles: "Matériels" },
    { idTitle: 3, libelles: "Fournitures" },
    { idTitle: 4, libelles: "Accessoires" },
    { idTitle: 5, libelles: "Équipements" },
  ]);
  const [dataarticle, setDataarticle] = useState([
    {
      idArticle: 2,
      title: "Matériels",
      images: materiel,
      listes: (
        <ul className="list-disc ml-5">
          <li>Moniteur</li>
          <li>Clavier, souris, disque dur</li>
          <li>...</li>
        </ul>
      ),
    },
    {
      idArticle: 3,
      title: "Fournitures",
      images: fourniture,
      listes: (
        <ul className="list-disc ml-5">
          <li>Stylos, crayon, marqueurs</li>
          <li>Ciseaux, blocs-notes</li>
          <li>...</li>
        </ul>
      ),
    },
    {
      idArticle: 4,
      title: "Accessoires",
      images: materiels,
      listes: (
        <ul className="list-disc ml-5">
          <li>Mug, verre</li>
          <li>Chaises, tables</li>
          <li>...</li>
        </ul>
      ),
    },
    {
      idArticle: 5,
      title: "Équipements",
      images: equipements,
      listes: (
        <ul className="list-disc ml-5">
          <li>Tournevis, clé à molette</li>
          <li>Cables, chargeur</li>
          <li>...</li>
        </ul>
      ),
    },
  ]);
  const [datatablehead, setDatahead] = useState([
    { idTablehead: 1, libelle: "Designation" },
    { idTablehead: 2, libelle: "Catégorie" },
    { idTablehead: 3, libelle: "Quatité" },
    { idTablehead: 4, libelle: "Unité" },
    { idTablehead: 5, libelle: "N° Comptable" },
    { idTablehead: 6, libelle: "Ref. Facture" },
  ]);

  const [selectedArticle, setSelectedArticle] = useState(1);

  const handleTitleClick = (idTitle) => {
    setSelectedArticle(idTitle);
  };

  const [modal, setModal] = useState(false);

  const toogleModal = () => {
    setModal(!modal);
  };

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
          <div className="w-full container mx-auto flex flex-col sm:flex-row sm:flex-wrap items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <div className="scroll-container w-full flex flex-wrap justify-center">
              {datatitle.map((item) => (
                <a
                  href="#"
                  onClick={() => handleTitleClick(item.idTitle)}
                  className={`scrollh hover:bg-gray-300 rounded py-2 px-4 mx-2 my-2 ${
                    selectedArticle === item.idTitle ? "bg-gray-300" : ""
                  }`}
                  key={item.idTitle}
                  aria-current={
                    selectedArticle === item.idTitle ? "page" : undefined
                  }
                >
                  {item.libelles}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ----------article-------- */}
      <div className="container mx-auto py-6">
        <section className="w-full mx-auto px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataarticle
              .filter((items) =>
                selectedArticle === 1
                  ? true
                  : items.idArticle === selectedArticle
              )
              .map((items) => (
                <article
                  className="flex flex-col shadow my-4 transform transition-transform duration-1000 hover:scale-105"
                  key={items.idArticle}
                >
                  <a href="#" className="hover:opacity-75"></a>
                  <div className="bg-white flex flex-col justify-start p-6">
                    <a
                      href="#"
                      className="text-blue-700 text-sm text-center font-bold uppercase pb-4"
                    >
                      {items.title}
                    </a>
                    <img
                      src={items.images}
                      alt={items.title}
                      className="mb-4 w-full h-96 object-cover rounded-lg"
                    />
                    <div>{items.listes}</div>
                    <div class="mt-1 flex items-center gap-x-6">
                      <a
                        href="#"
                        class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={toogleModal}
                      >
                        En savoir plus <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          {modal && (
            <div
              class="relative z-10"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
              onClick={toogleModal}
            >
              <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div class="sm:flex sm:items-start">
                        <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                          <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                              {datatablehead.map((item) => (
                                <th
                                  scope="col"
                                  className="py-3 px-6 text-xs font-medium tracking-wider text-center text-gray-700 uppercase dark:text-gray-400"
                                  key={item.idTablehead}
                                >
                                  {item.libelle}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                      >
                        nouveau
                      </button>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={toogleModal}
                      >
                        retour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="w-full border-t bg-white pb-12">
        <div className="w-full container mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
            <a href="#" className="uppercase px-3">
              About Us
            </a>
            <a href="#" className="uppercase px-3">
              Privacy Policy
            </a>
            <a href="#" className="uppercase px-3">
              Terms & Conditions
            </a>
            <a href="#" className="uppercase px-3">
              Contact Us
            </a>
          </div>
          <div className="uppercase pb-6">&copy; myblog.com</div>
        </div>
      </footer>
    </>
  );
}

export default Home;
