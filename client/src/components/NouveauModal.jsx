import React, { useState, useEffect } from "react";
import { createArticle } from "../services/articleApi";
import QRCode from "qrcode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NouveauModal({ onClose, onAddArticle }) {
  console.log("onAddArticle reçu dans NouveauModal :", onAddArticle);
  console.log("Props reçues dans NouveauModal :", { onClose, onAddArticle });

  const [nouveauModal, setNouveauModal] = useState(false);
  const [articlesData, setArticleData] = useState({
    ref_article: "",
    designation: "",
    description: "",
    quantite: "",
    unite: "",
    num_comptable: "",
    ref_facture: "",
    date: "",
  });

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articlesData, [name]: value });
  };

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = `${articlesData.ref_article} - ${articlesData.designation}`;
        const qrUrl = await QRCode.toDataURL(qrData);
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error("Erreur lors de la génération du QR code :", error);
      }
    };

    generateQRCode();
  }, [articlesData]);

  const successNotify = () => {
    toast.success("ajout réussi!", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const errorNotify = () => {
    toast.error("erreur de l'ajout!", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis");

    const newArticle = {
      ref_article: articlesData.ref_article,
      designation: articlesData.designation,
      description: articlesData.description,
      quantite: articlesData.quantite,
      unite: articlesData.unite,
      num_comptable: articlesData.num_comptable,
      ref_facture: articlesData.ref_facture,
      date: articlesData.date,
      qr_code: qrCodeUrl,
    };

    const response = await createArticle(newArticle);
    console.log("Réponse de l'API :", response);

    if (response.status === 200) {
      successNotify();
    } else {
      errorNotify();
    }

    if (typeof onAddArticle === "function") {
      console.log("Appel de onAddArticle avec :", newArticle);
      await onAddArticle(newArticle);
    } else {
      console.error("onAddArticle n'est pas une fonction");
    }

    onClose();
  };

  const handleClickNouveau = (id) => {
    if (id === 4) {
      setNouveauModal(!nouveauModal);
    }
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        onClick={handleClickNouveau}
      >
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
              <div className="bg-white mt-8 shadow-lg shadow-blue-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <form
                    className="shadow px-4 rounded py-4"
                    onSubmit={handleSubmit}
                  >
                    <div className="space-y-12">
                      <div className="flex flex-col border rounded-md bg-blue-600 items-center py-4">
                        <a
                          className="font-bold text-white uppercase hover:text-gray-700 text-2xl"
                          href="#"
                        >
                          Nouveau Stock
                        </a>
                      </div>
                      <div className="border-b border-gray-900/10 pb-12 w-full max-w-4xl">
                        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="ref_article"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Référence article
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="ref_article"
                                id="ref_article"
                                value={articlesData.ref_article}
                                onChange={handleChange}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="designation"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Désignation
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="designation"
                                value={articlesData.designation}
                                onChange={handleChange}
                                id="design"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="descri"
                                name="description"
                                rows="3"
                                value={articlesData.description}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              ></textarea>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                              Décrire l' objet en fonction de sa forme, de sa
                              couleur, de sa marque, etc
                            </p>
                          </div>{" "}
                          <br />
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="num_comptable"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Numéro Comptable
                            </label>
                            <div className="mt-2">
                              <input
                                id="num_compta"
                                name="num_comptable"
                                type="number"
                                value={articlesData.num_comptable}
                                onChange={handleChange}
                                autoComplete="numero"
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
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
                                value={articlesData.ref_facture}
                                onChange={handleChange}
                                autoComplete="street-address"
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
                                id="quantité"
                                value={articlesData.quantite}
                                onChange={handleChange}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="unite"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Unité
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="unite"
                                id="unite"
                                value={articlesData.unite}
                                onChange={handleChange}
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-2">
                            <label
                              htmlFor="date"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Date
                            </label>
                            <div className="mt-2">
                              <input
                                id="date"
                                name="date"
                                type="date"
                                value={articlesData.date}
                                onChange={handleChange}
                                autoComplete="date"
                                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                          Code QR:
                        </h2>
                        {qrCodeUrl ? (
                          <img src={qrCodeUrl} alt="QR Code" />
                        ) : (
                          <p>QR Code is being generated...</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={onClose}
                      >
                        retour
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Confirmer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default NouveauModal;
