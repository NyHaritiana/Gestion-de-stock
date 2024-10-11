import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { BarChart } from "@mui/x-charts/BarChart";
import { createEntree, getEntree } from "../services/entreeApi";
import { getArticle } from "../services/articleApi";

function Entree() {
  const [dataCategory, setDataCategory] = useState([
    { idCateg: 1, libelle: "Materiels" },
    { idCateg: 2, libelle: "Fournitures" },
    { idCateg: 3, libelle: "Accessoires" },
    { idCateg: 4, libelle: "Equipements" },
  ]);

  const [entreeData, setEntreeData] = useState({
    ref_article: "",
    quantite: "",
    ref_facture: "",
    date_entree: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntreeData({ ...entreeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Entrees:", entreeData);
    const newEntry = {
      ref_article: entreeData.ref_article,
      quantite: entreeData.quantite,
      ref_facture: entreeData.ref_facture,
      date_entree: entreeData.date_entree,
      designation: articles.find(article => article.ref_article === entreeData.ref_article)?.designation || 'Inconnu'
    };
    setEntrees(prevEntrees => [...prevEntrees, newEntry]);
    setEntreeData({
      ref_article: "",
      quantite: "",
      ref_facture: "",
      date_entree: "",
    });
    try {
      const response = await createEntree({
        ref_article: entreeData.ref_article,
        quantite: entreeData.quantite,
        ref_facture: entreeData.ref_facture,
        date_entree: entreeData.date_entree,
      });
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
    setEntreeData({ ...entreeData, ref_article: value });
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

  const [entrees, setEntrees] = useState([]);
  useEffect(() => {
    const fetchEntrees = async () => {
      try {
        const data = await getEntree();
        const enrichedEntrees = data.map((entree) => {
          const article = articles.find(
            (article) => article.ref_article === entree.ref_article
          );
          return {
            ...entree,
            designation: article ? article.designation : "Inconnu",
          };
        });
        setEntrees(enrichedEntrees);
      } catch (err) {
        console.error("Erreur lors de la récupération des articles", err);
      }
    };

    fetchEntrees();
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
            Stock Entrée
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
                  Nouveau Stock
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
                      value={entreeData.ref_article}
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
                      htmlFor="ref_facture"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Référence facture
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="ref_facture"
                        id="ref_facture"
                        autoComplete="ref_facture"
                        onChange={handleChange}
                        value={entreeData.ref_facture}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
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
                        onChange={handleChange}
                        value={entreeData.quantite}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="date_entree"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date
                    </label>
                    <div className="mt-2">
                      <input
                        id="date_entree"
                        name="date_entree"
                        type="date"
                        autoComplete="date"
                        onChange={handleChange}
                        value={entreeData.date_entree}
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        required
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
              Statistiques des entrées par catégorie
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
            <div className="shadow px-2 rounded py-2 my-4">
              <h6 className="text-base font-bold text-center">
                Historiques des entrées
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
                  {entrees.length > 0 ? (
                    entrees.map((entree) => (
                      <tr key={entree.ref_facture}>
                        <td className="text-sm">{entree.designation}</td>
                        <td className="text-sm">{entree.quantite}</td>
                        <td className="text-sm">{new Date(entree.date_entree).toLocaleDateString()}</td>
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

export default Entree;
