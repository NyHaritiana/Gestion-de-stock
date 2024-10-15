import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import NouveauModal from "./NouveauModal";
import TableModal from "./TableModal";

function TableauStocks({ articles, handleAddArticle, handleUpdateArticle, handleDeleteArticle }) {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [datatablehead, setDatahead] = useState([
    { idTablehead: 1, libelle: "Ref. Article" },
    { idTablehead: 2, libelle: "Désignation" },
    { idTablehead: 3, libelle: "Description" },
    { idTablehead: 4, libelle: "Quantité" },
    { idTablehead: 5, libelle: "Unité" },
    { idTablehead: 7, libelle: "N° Comptable" },
    { idTablehead: 6, libelle: "Ref. Facture" },
    { idTablehead: 8, libelle: "Date" },
    { idTablehead: 9, libelle: "Actions" },
  ]);

  const handleRowClick = (article) => {
    setSelectedArticle(article);
    setIsTableModalOpen(true);
  };

  return (
    <>
      <div className="w-full mx-auto px-3">
        <h1 className="font-bold py-4 text-gray-700 text-xl text-center">
          STOCKS AU SEIN DE LA DSI:
        </h1>
        <table className="min-w-full divide-gray-200 table-fixed rounded-lg dark:divide-gray-700 shadow my-4 border-collapse border border-slate-500 overflow-hidden">
          <thead className="bg-blue-600 dark:bg-gray-900">
            <tr>
              {datatablehead.map((item) => (
                <th
                  scope="col"
                  className="py-6 px-4 text-xs font-bold tracking-wider text-center text-white uppercase dark:text-gray-400"
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
                  onClick={() => handleRowClick(article)}
                >
                  <td className="text-center py-4">{article.ref_article}</td>
                  <td className="text-center py-4">{article.designation}</td>
                  <td className="text-center py-4">{article.description}</td>
                  <td className="text-center py-4">{article.quantite}</td>
                  <td className="text-center py-4">{article.unite}</td>
                  <td className="text-center py-4">{article.num_comptable}</td>
                  <td className="text-center py-4">{article.ref_facture}</td>
                  <td className="text-center py-4">{article.date}</td>
                  <td className="text-center py-4">
                    <div className="flex justify-center items-center">
                      <AiFillDelete
                        className="text-red-600 cursor-pointer"
                        size={20}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteArticle(article.ref_article);
                        }}
                      />
                    </div>
                  </td>
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

      {isAddModalOpen && (
        <NouveauModal
          onAddArticle={handleAddArticle}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      {isTableModalOpen && selectedArticle && (
        <TableModal
          article={selectedArticle}
          onClose={() => setIsTableModalOpen(false)}
          onUpdateArticle={handleUpdateArticle}
        />
      )}
    </>
  );
}

export default TableauStocks;
