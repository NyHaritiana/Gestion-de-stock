import React, { useState, useEffect } from "react";
import { editArticle } from "../services/articleApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode";

function TableModal({ article, onClose, onUpdateArticle }) {
  const [editableArticle, setEditableArticle] = useState(article);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const successNotify = () => {
    toast.success("modification réussi!", {
      position: "bottom-center",
      autoClose: 1500,
    });
  };

  const errorNotify = () => {
    toast.error("erreur de la modification!", {
      position: "bottom-center",
      autoClose: 1500,
    });
  };

  const handleUpdateArticle = async () => {
    try {
      const response = await editArticle(
        editableArticle.ref_article,
        editableArticle
      );
      await onUpdateArticle(editableArticle);
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.data.success
      ) {
        successNotify();
      } else {
        errorNotify();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
    }
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  useEffect(() => {
    setEditableArticle(article);

    if (article) {
      const qrData = `${article.ref_article} - ${article.designation}`;
      QRCode.toDataURL(qrData)
        .then((url) => {
          setQrCodeValue(url);
        })
        .catch((err) => {
          console.error("Erreur lors de la génération du QR code :", err);
        });
    }
  }, [article]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2 mt-8 flex flex-col">
        <div className="flex flex-grow">
          <div className="w-2/3">
            <h2 className="text-xl font-bold mb-4 px-2 py-2">
              Détails de l'Article
            </h2>
            <table className="w-full">
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
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
                      className="border p-1 border-white w-full"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-1/3 flex justify-center items-center">
            {qrCodeValue && (
              <img
                src={qrCodeValue}
                alt={`QR Code for ${editableArticle.ref_article} and ${editableArticle.designation}`}
                className="max-w-full max-h-full"
              />
            )}{" "}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-white text-black border border-black font-bold px-4 py-2 rounded mx-2"
          >
            Fermer
          </button>
          <button
            onClick={handleUpdateArticle}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TableModal;
