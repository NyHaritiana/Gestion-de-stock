import React, { useEffect, useState } from "react";
import { getArticle } from "../services/articleApi";
import NouveauModal from "./NouveauModal";

function TableauStocks() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [datatablehead, setDatahead] = useState([
    { idTablehead: 1, libelle: "Ref. Article" },
    { idTablehead: 2, libelle: "Désignation" },
    { idTablehead: 3, libelle: "Description" },
    { idTablehead: 4, libelle: "Quantité" },
    { idTablehead: 5, libelle: "Unité" },
    { idTablehead: 7, libelle: "N° Comptable" },
    { idTablehead: 6, libelle: "Ref. Facture" },
    { idTablehead: 8, libelle: "Date" },
  ]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticle();
        setArticles(data);
      } catch (err) {
        console.error("Erreur lors de la recuperation", err);
        setError("Erreur lors de la recuperation");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleAddArticle = (newArticle) => {
    console.log("Article ajouté au tableau :", newArticle); 
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  return (
    <>
      <div className="w-full mx-auto px-3">
        <h1 className="font-bold py-4 text-gray-700 text-xl text-center">
          STOCKS AU SEIN DE LA DSI:
        </h1>
        <table className="min-w-full divide-gray-200 table-fixed rounded-lg dark:divide-gray-700 shadow my-4 border-collapse border border-slate-500">
          <thead className="bg-gray-400 dark:bg-gray-900">
            <tr>
              {datatablehead.map((item) => (
                <th
                  scope="col"
                  className="py-3 px-4 text-xs font-bold tracking-wider text-center text-gray-800 uppercase dark:text-gray-400"
                  key={item.idTablehead}
                >
                  {item.libelle}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr
                  key={article.ref_article}
                  className="border border-slate-700"
                >
                  <td className="text-center py-4">{article.ref_article}</td>
                  <td className="text-center py-4">{article.designation}</td>
                  <td className="text-center py-4">{article.description}</td>
                  <td className="text-center py-4">{article.quantite}</td>
                  <td className="text-center py-4">{article.unite}</td>
                  <td className="text-center py-4">{article.num_comptable}</td>
                  <td className="text-center py-4">{article.ref_facture}</td>
                  <td className="text-center py-4">{article.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={datatablehead.length} className="text-center py-4">
                  Aucun article trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <NouveauModal
          onClose={() => setIsModalOpen(false)}
          onAddArticle={handleAddArticle}
        />
      )}
    </>
  );
}

export default TableauStocks;
