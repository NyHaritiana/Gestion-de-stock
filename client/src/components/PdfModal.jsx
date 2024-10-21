import React, { useState, useEffect } from "react";
import { format, subMonths } from "date-fns";
import ExportToExcel from "./ExportToExcel";
import ExportToPdf from "./ExportToPdf";
import { getEntree } from "../services/entreeApi";
import { getArticle } from "../services/articleApi";
import { getSortie } from "../services/sortieApi";

function PdfModal({ onExit }) {
  const [selected, setSelected] = useState(0);

  const handleSelect = (index) => {
    setSelected(index);
  };
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [entrees, setEntrees] = useState([]);
  const [sorties, setSorties] = useState([]);
  const [generateExcel, setGenerateExcel] = useState(false);
  const [generatePdf, setGeneratePdf] = useState(false);

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

  // Fetch Entrées
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

  // Fetch Sorties
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getLastFiveMonths = () => {
    const months = [];
    for (let i = 2; i < 7; i++) {
      const monthDate = subMonths(new Date(), i);
      months.push(format(monthDate, "MMMM yyyy"));
    }
    return months;
  };

  // Filter data based on the selected option and month
  const filteredData =
    selected === 0
      ? selectedOption === "autre_mois" && selectedMonth
        ? entrees.filter(
            (entree) =>
              format(new Date(entree.date_entree), "MMMM yyyy") ===
              selectedMonth
          )
        : entrees
      : selectedOption === "autre_mois" && selectedMonth
      ? sorties.filter(
          (sortie) =>
            format(new Date(sortie.date_sortie), "MMMM yyyy") === selectedMonth
        )
      : sorties;

  //const handleGenerate = () => {
  //  console.log("Données filtrées : ", filteredData);
  //  if (generateExcel) {
  //    return <ExportToExcel data={sampleData} />;
  //  }
  //  if (generatePdf) {
  //    return <ExportToPdf data={filteredData} />;
  //  }
  //};

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <h1 className="font-semibold text-lg px-8 my-4">
                Rapport de gestion :
              </h1>
              <div className="bg-gray-100 shadow-lg shadow-blue-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="relative flex bg-gray-200 p-2 rounded-lg w-full max-w-md">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg transition-all duration-300"
                    style={{
                      width: `${100 / 2}%`,
                      transform: `translateX(${selected * 100}%)`,
                    }}
                  ></div>

                  <label className="relative z-10 flex-1 text-center">
                    <input
                      type="radio"
                      name="nav"
                      className="sr-only peer"
                      checked={selected === 0}
                      onChange={() => handleSelect(0)}
                    />
                    <span className="block py-2 cursor-pointer peer-checked:text-white font-semibold">
                      Entrée
                    </span>
                  </label>

                  <label className="relative z-10 flex-1 text-center">
                    <input
                      type="radio"
                      name="nav"
                      className="sr-only peer"
                      checked={selected === 1}
                      onChange={() => handleSelect(1)}
                    />
                    <span className="block py-2 cursor-pointer peer-checked:text-white font-semibold">
                      Sortie
                    </span>
                  </label>
                </div>
                <div className="mt-4">
                  <form className="flex space-x-4">
                    <label
                      htmlFor="option1"
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        name="option"
                        id="option1"
                        value="mois_ci"
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Ce mois-ci</span>
                    </label>
                    <label
                      htmlFor="option2"
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        name="option"
                        id="option2"
                        value="mois_precedent"
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Mois dernier</span>
                    </label>
                    <label
                      htmlFor="option3"
                      className="inline-flex items-center"
                    >
                      <input
                        type="radio"
                        name="option"
                        id="option3"
                        value="autre_mois"
                        onChange={handleOptionChange}
                      />
                      <span className="ml-2">Autre mois avant</span>
                    </label>
                  </form>
                  {selectedOption === "autre_mois" && (
                    <div className="mt-4">
                      <label htmlFor="month" className="block mb-2"></label>
                      <select
                        id="month"
                        name="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="border p-2 rounded"
                      >
                        <option value="">Sélectionnez</option>
                        {getLastFiveMonths().map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="my-8">
                <form action="" className="flex space-x-12">
                    <label htmlFor="excel" className="inline-flex items-center">
                      <ExportToExcel data={filteredData} />
                    </label>
                    <label htmlFor="pdf" className="inline-flex items-center">
                      <ExportToPdf data={filteredData} />
                    </label>
                  </form>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-bold leading-6 text-gray-900"
                    onClick={onExit}
                  >
                    retour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PdfModal;
