import React, { useState, useEffect } from "react";
import { editArticle } from "../services/articleApi";

function TableModal({ article, onClose }) {
  const [editableArticle, setEditableArticle] = useState(article);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleUpdateArticle = async () => {
    try {
      const response = await editArticle(editableArticle.ref_article, editableArticle);
      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
    }
  };

  useEffect(() => {
    setEditableArticle(article);
  }, [article]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2 mt-8">
        <h2 className="text-xl font-bold mb-4 px-2 py-2">Détails de l'Article</h2>
        <table>
          <tbody>
            <tr>
              <td className="font-bold px-2 py-2">Référence Article</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="text"
                  name="ref_article"
                  value={editableArticle.ref_article}
                  onChange={handleChange}
                  className="border p-1 border-white"
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">Désignation</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="text"
                  name="designation"
                  value={editableArticle.designation}
                  onChange={handleChange}
                  className="border p-1 border-white"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">Description</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <textarea
                  name="description"
                  value={editableArticle.description}
                  onChange={handleChange}
                  className="border p-1 w-full border-white"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">Quantité</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="number"
                  name="quantite"
                  value={editableArticle.quantite}
                  onChange={handleChange}
                  className="border p-1 border-white"
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">Unité</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="text"
                  name="unite"
                  value={editableArticle.unite}
                  onChange={handleChange}
                  className="border p-1 border-white"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">N° Comptable</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="text"
                  name="num_comptable"
                  value={editableArticle.num_comptable}
                  onChange={handleChange}
                  className="border p-1 border-white"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">Référence Facture</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="text"
                  name="ref_facture"
                  value={editableArticle.ref_facture}
                  onChange={handleChange}
                  className="border p-1 border-white"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold px-2 py-2">Date</td>
              <td className="font-bold px-2 py-2">:</td>
              <td className="px-2 py-2">
                <input
                  type="date"
                  name="date"
                  value={editableArticle.date}
                  onChange={handleChange}
                  className="border p-1 border-white"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-white text-black border border-black font-bold px-4 py-2 rounded mx-2"
          >
            Fermer
          </button>
          <button
            onClick={handleUpdateArticle}
            className="mt-4 bg-black text-white px-4 py-2 rounded"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default TableModal;
