import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "./Navbar";
import { BarChart } from "@mui/x-charts/BarChart";
import { createEntree, getEntree } from "../services/entreeApi";
import { getArticle } from "../services/articleApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Entree() {
  const [entreeData, setEntreeData] = useState({
    ref_article: "",
    quantite: "",
    ref_facture: "",
    date_entree: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

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
      designation:
        articles.find(
          (article) => article.ref_article === entreeData.ref_article
        )?.designation || "Inconnu",
    };
    setEntrees((prevEntrees) => [...prevEntrees, newEntry]);
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
      if (response.status === 200 || response.status === 201) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        toast.success("Entrée crée avec succès");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      toast.error("Échec de la création de l'entrée. Veuillez réessayer.");
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

  const [quantitesParMois, setQuantitesParMois] = useState(Array(12).fill(0));

  useEffect(() => {
    if (entrees.length > 0) {
      const quantitesMois = Array(12).fill(0);

      entrees.forEach((entree) => {
        const date = new Date(entree.date_entree);
        const mois = date.getMonth();
        quantitesMois[mois] += Number(entree.quantite);
      });

      setQuantitesParMois(quantitesMois);
    }
  }, [entrees]);

  return (
    <>
      {isLoading ? (
        <Skeleton count={1} height={30} style={{ margin: "10px 0" }} />
      ) : (
        <Navbar />
      )}

      {/* -----------title----------- */}
      <header className="w-full container mx-auto">
        <div className="flex flex-col items-center py-20">
          {isLoading ? (
            <Skeleton
              width={300}
              height={40}
              duration={1.5}
              baseColor="#e2e8f0"
              highlightColor="#e5e7eb "
            />
          ) : (
            <a
              className="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl"
              href="#"
            >
              Stock Entrée
            </a>
          )}
          {isLoading ? (
            <Skeleton
              width={200}
              height={15}
              duration={1.5}
              baseColor="#e2e8f0"
              highlightColor="#e5e7eb "
            />
          ) : (
            <p className="text-lg text-gray-600">
              Direction du Système d' Information
            </p>
          )}
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
                {isLoading ? (
                  <Skeleton
                    width={300}
                    height={40}
                    duration={1.5}
                    baseColor="#e2e8f0"
                    highlightColor="#e5e7eb "
                  />
                ) : (
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
                )}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  {isLoading ? (
                    <Skeleton
                      width={400}
                      height={40}
                      duration={1.5}
                      baseColor="#e2e8f0"
                      highlightColor="#e5e7eb "
                    />
                  ) : (
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
                  )}

                  {isLoading ? (
                    <Skeleton
                      width={150}
                      height={40}
                      duration={1.5}
                      baseColor="#e2e8f0"
                      highlightColor="#e5e7eb "
                    />
                  ) : (
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
                  )}

                  {isLoading ? (
                    <Skeleton
                      width={150}
                      height={40}
                      duration={1.5}
                      baseColor="#e2e8f0"
                      highlightColor="#e5e7eb "
                    />
                  ) : (
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
                  )}
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
                className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirmer
              </button>
            </div>
          </form>
          <div className="shadow px-4 rounded py-4">
            <h6 className="text-base font-bold text-center">
              Statistiques mensuelles des stocks entrées
            </h6>
            {isLoading ? (
              <Skeleton height={290} width="100%" />
            ) : (
              <BarChart
                series={[{ data: quantitesParMois }]}
                height={290}
                xAxis={[
                  {
                    data: [
                      "Jan",
                      "Fev",
                      "Mars",
                      "Avr",
                      "Mai",
                      "Juin",
                      "Juill",
                      "Aout",
                      "Sept",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            )}

            <div className="shadow px-2 rounded py-2 my-4">
              <h6 className="text-base font-bold text-center">
                Historiques des entrées
              </h6>
              <div className="h-64 overflow-y-auto">
                {isLoading ? (
                  <Skeleton
                    count={5}
                    height={30}
                    style={{ margin: "10px 0" }}
                  />
                ) : (
                  <table className="min-w-full my-4 divide-gray-100 table-fixed dark:divide-gray-100">
                    <thead>
                      <tr>
                        <th className="text-center text-sm">Désignation</th>
                        <th className="text-center text-sm">Quantité</th>
                        <th className="text-center text-sm">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entrees.length > 0 ? (
                        entrees.map((entree) => (
                          <tr key={entree.ref_facture}>
                            <td className="text-center text-sm">
                              {entree.designation}
                            </td>
                            <td className="text-center text-sm">
                              {entree.quantite}
                            </td>
                            <td className="text-center text-sm">
                              {new Date(
                                entree.date_entree
                              ).toLocaleDateString()}
                            </td>
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
                )}
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button className="text-blue-500 text-base rounded px-2 py-1">
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Entree;
