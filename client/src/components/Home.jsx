import React, { useState } from "react";

function Home() {
  const [datahead, setDatahead] = useState([
    { id: 1, libelle: "Designation" },
    { id: 2, libelle: "Catégorie" },
    { id: 3, libelle: "Quatiité" },
    { id: 4, libelle: "Unité" },
    { id: 5, libelle: "N° Comptable" },
    { id: 6, libelle: "Ref. Facture" },
  ]);
  return (
    <>
      {/* ---------navbar------------ */}
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
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Matériels
            </a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Clés
            </a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Accessoires
            </a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Équipements
            </a>
            <a href="#" className="hover:bg-gray-400 rounded py-2 px-4 mx-2">
              Fournitures
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex flex-wrap py-6">
        <section className="w-full flex flex-col px-3">
          <article className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75"></a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a
                href="#"
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                Matériels
              </a>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
              </table>
            </div>
          </article>
          <article className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75"></a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a
                href="#"
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                Clés
              </a>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
              </table>
            </div>
          </article>
          <article className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75"></a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a
                href="#"
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                Accessoires
              </a>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
              </table>
            </div>
          </article>
          <article className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75"></a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a
                href="#"
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                Équipements
              </a>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
              </table>
            </div>
          </article>
          <article className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75"></a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a
                href="#"
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                Fournitures
              </a>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
              </table>
            </div>
          </article>
          <article className="flex flex-col shadow my-4">
            <a href="#" className="hover:opacity-75"></a>
            <div className="bg-white flex flex-col justify-start p-6">
              <a
                href="#"
                className="text-blue-700 text-sm font-bold uppercase pb-4"
              >
                Autres
              </a>
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
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
              </table>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}

export default Home;
