import React, { useState, useEffect } from "react";
import { createExterieur, deleteExterieur, getExterieur } from "../services/exterieurApi";

function Exterieur({ onClose }) {
  const today = new Date();
  const formatDate = today.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const [extData, setExtData] = useState({
    design: "",
    date: formatDate,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtData({ ...extData, [name]: value });
  };

  const handleAddDesign = async (e) => {
    e.preventDefault();
    const newAffaire = {
      design: extData.design,
      date: new Date().toISOString(),
  };
    setExterieur((prevExterieur) => [...prevExterieur, newAffaire]);
    setExtData({
      design: "",
      date: formatDate,
    });
    try {
      const response = await createExterieur(newAffaire);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("authToken", token);
        fetchExterieur();
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const [exterieur, setExterieur] = useState([]);

  const fetchExterieur = async () => {
    try {
      const data = await getExterieur();
      setExterieur(data);
    } catch (err) {
      console.error("Erreur lors de la récupération des affaires", err);
    }
  };

  const handleDeleteDesign = async (num_affaire) => {
    try {
      const response = await deleteExterieur(num_affaire);
      if (response.status === 200) {
        setExterieur((prevExterieur) => 
          prevExterieur.filter(ext => ext.num_affaire !== num_affaire)
        );
        console.log("Affaire a ete bien supprimer");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'affaire :", error);
    }
  };

  useEffect(() => {
    fetchExterieur();
  }, []);

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
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-4 sm:w-full sm:max-w-3xl">
              <h1 className="font-semibold text-lg px-4 my-4">
                Gestion des affaires exterieurs :
              </h1>
              <div className="bg-gray-100 shadow-lg shadow-blue-600 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div>
                  <h2 className="font-bold py-4 text-gray-700">Décrire l'objet :</h2>
                  <input
                    type="text"
                    name="design"
                    value={extData.design}
                    onChange={handleChange}
                    placeholder="Quantité, designation, ..."
                    className="px-2 py-2"
                  />
                  <button onClick={handleAddDesign} className="bg-blue-500 font-semibold text-white rounded-md px-3 py-2 mx-4">
                    Ajouter
                  </button>

                  <h2 className="font-bold py-4 text-gray-700">Listage des affaires non rendu :</h2>
                  <table className="w-2/3 border-collapse">
                    <tbody>
                      {exterieur.map((ext) => (
                        <tr key={ext.num_affaire}>
                          <td className="p-4">{ext.design}</td>
                          <td>|</td>
                          <td className="p-4 text-center">{ext.date || formatDate}</td>
                          <td>|</td>
                          <td className="p-4">
                            <button 
                              onClick={() => handleDeleteDesign(ext.num_affaire)}
                              className="bg-green-500 text-white rounded-md px-4 py-2"
                            >
                              rendu
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-bold leading-6 text-gray-900"
                    onClick={onClose}
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

export default Exterieur;