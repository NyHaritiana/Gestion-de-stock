import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { createSortie, getSortie } from "../services/sortieApi";
import { getArticle } from "../services/articleApi";

function Sortie() {
  const [dataCategory, setDataCategory] = useState([
    { idCateg: 1, libelle: "Materiels" },
    { idCateg: 2, libelle: "Fournitures" },
    { idCateg: 3, libelle: "Accessoires" },
    { idCateg: 4, libelle: "Equipements" },
  ]);

  const [sortieData, setSortieData] = useState({
    nom_recepteur: "",
    date_sortie: "",
    quantite: "",
    ref_article: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSortieData({ ...sortieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sorties: ", sortieData);
    const newSortie = {
      nom_recepteur: sortieData.nom_recepteur,
      date_sortie: sortieData.date_sortie,
      quantite: sortieData.quantite,
      ref_article: sortieData.ref_article,
      designation:
        articles.find(
          (article) => article.ref_article === sortieData.ref_article
        )?.designation || "Inconnu",
    };
    setSorties((prevSorties) => [...prevSorties, newSortie]);
    setSortieData({
      nom_recepteur: "",
      date_sortie: "",
      quantite: "",
      ref_article: ""
    });
    try {
      const response = await createSortie(newSortie);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSortieData({ ...sortieData, ref_article: value });
  };

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticle();
        setArticles(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des articles", err);
      }
    };

    fetchArticles();
  }, []);

  const [sorties, setSorties] = useState([]);
  useEffect(() => {
    const fetchSorties = async () => {
      try {
        const data = await getSortie();
        const enrichedSorties = data.map((sortie) => {
          const article = articles.find(
            (article) => article.ref_article === sortie.ref_article
          );
          return {
            ...sortie,
            designation: article ? article.designation : "Inconnu",
          };
        });
        setSorties(enrichedSorties);
      } catch (err) {
        console.error("Erreur lors de la récupération des articles", err);
      }
    };

    fetchSorties();
  }, [articles]);

  return (
    <>
      <Navbar />

      {/* -----------title----------- */}
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-20">
          <a
            className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
            href="#"
          >
            Stock Sortie
          </a>
          <p className="text-lg text-gray-600">
            Direction du Système d' Information
          </p>
        </div>
      </header>

      {/* -------------form--------------- */}
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form className="shadow px-4 rounded py-4" onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="flex flex-col items-center py-4">
                <a
                  className="font-bold text-gray-800 uppercase hover:text-gray-700 text-2xl"
                  href="#"
                >
                  Formulaire de sortie
                </a>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="ref_article"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Référence article
                  </label>
                  <div className="mt-2">
                    <select
                      id="ref_article"
                      name="ref_article"
                      value={sortieData.ref_article}
                      onChange={handleSelectChange}
                      className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option></option>
                      {articles.length > 0 ? (
                        articles.map((article) => (
                          <option
                            key={article.ref_article}
                            value={article.ref_article}
                          >
                            {article.ref_article} - {article.designation}
                          </option>
                        ))
                      ) : (
                        <option disabled>Chargement des articles...</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="nom_recepteur"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nom du recepteur
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="nom_recepteur"
                        id="nom_recepteur"
                        autoComplete="nom_recepteur"
                        onChange={handleChange}
                        value={sortieData.nom_recepteur}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="quantite"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Quantité
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="quantite"
                        id="quantite"
                        autoComplete="address-level2"
                        onChange={handleChange}
                        value={sortieData.quantite}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="date_sortie"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date
                    </label>
                    <div className="mt-2">
                      <input
                        id="date_sortie"
                        name="date_sortie"
                        type="date"
                        autoComplete="date"
                        onChange={handleChange}
                        value={sortieData.date_sortie}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Notifications
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600"></p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirmer
              </button>
            </div>
          </form>
          <div className="shadow px-4 rounded py-4">
            <h6 className="text-base font-bold text-center">
              Statistiques des sorties par catégorie
            </h6>
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[
                {
                  data: [
                    "Matériels",
                    "Fournitures",
                    "Accessoires",
                    "Equipements",
                  ],
                  scaleType: "band",
                },
              ]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
            <div className="shadow px-2 rounded py-4 my-4">
              <h6 className="text-base font-bold text-center">
                Historiques des sorties
              </h6>
              <table className="min-w-full my-4 divide-gray-100 table-fixed dark:divide-gray-100">
                <thead>
                  <tr>
                    <th className="text-left text-sm">Désignation</th>
                    <th className="text-left text-sm">Quantité</th>
                    <th className="text-left text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                {sorties.length > 0 ? (
                    sorties.map((sortie) => (
                      <tr key={sortie.ref_article}>
                        <td className="text-sm">{sortie.designation}</td>
                        <td className="text-sm">{sortie.quantite}</td>
                        <td className="text-sm">{new Date(sortie.date_sortie).toLocaleDateString()}</td>
                      </tr>
                    ))
                    ) : (
                    <tr>
                      <td colSpan="3" className="text-center text-sm">
                        Aucune entrée trouvée.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sortie;
