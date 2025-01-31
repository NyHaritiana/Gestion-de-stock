import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import NouveauModal from "./NouveauModal";
import TableModal from "./TableModal";

function TableauStocks({
  articles,
  handleAddArticle,
  handleUpdateArticle,
  handleDeleteArticle,
}) {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

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

  const confirmDelete = (article) => {
    setArticleToDelete(article);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (articleToDelete) {
      handleDeleteArticle(articleToDelete.ref_article);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto px-3">
        <div className="overflow-x-auto">
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
                    <td className="text-center py-4">
                      {article.num_comptable}
                    </td>
                    <td className="text-center py-4">{article.ref_facture}</td>
                    <td className="text-center py-4">{article.date}</td>
                    <td className="text-center py-4">
                      <div className="flex justify-center items-center">
                        <AiFillDelete
                          className="text-red-600 cursor-pointer"
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(article);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={datatablehead.length}
                    className="text-center py-4"
                  >
                    Aucun article trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-center p-4">
                  <h2 className="text-xl text-white font-bold mb-4">Confirmation</h2>
                  <p className="text-white">Êtes-vous sûr de vouloir supprimer cet article ?</p>
                  <div className="mt-4">
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                      onClick={handleConfirmDelete}
                    >
                      Confirmer
                    </button>
                    <button
                      className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md"
                      onClick={() => setIsDeleteModalOpen(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableauStocks;
