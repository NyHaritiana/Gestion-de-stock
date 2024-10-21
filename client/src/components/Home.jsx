import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../App.css";
import exterieur from "../assets/exterieur.png";
import nouveau from "../assets/nouveau.png";
import rapport from "../assets/rapport.png";
import NouveauModal from "./NouveauModal";
import TableauStocks from "./TableauStocks";
import { deleteArticle, getArticle } from "../services/articleApi";
import PdfModal from "./PdfModal";
import Exterieur from "./Exterieur";

function Home() {
  const [datatitle, setDatatitle] = useState([
    { idTitle: 1, libelles: "Tous" },
    { idTitle: 2, libelles: "Matériels" },
    { idTitle: 3, libelles: "Fournitures" },
    { idTitle: 4, libelles: "Accessoires" },
    { idTitle: 5, libelles: "Équipements" },
  ]);
  const [dataarticle, setDataarticle] = useState([
    {
      idArticle: 2,
      title: "Stocks intérieurs",
    },
    {
      idArticle: 3,
      title: "Affaires Extérieur",
      image: exterieur,
    },
    {
      idArticle: 4,
      title: "Nouveau",
      image: nouveau,
    },
    {
      idArticle: 5,
      title: "Rapports",
      image: rapport,
    },
  ]);

  const [selectedArticle, setSelectedArticle] = useState(1);

  const handleTitleClick = (idTitle) => {
    setSelectedArticle(idTitle);
  };

  const [nouveauModal, setNouveauModal] = useState(false);
  const [pdfModal, setPdfModal] = useState(false);
  const [exterieurModal, setExterieurModal] = useState(false);

  const handleClickNouveau = (id) => {
    if (id === 3) {
      setExterieurModal(!exterieurModal);
    }
    if (id === 4) {
      setNouveauModal(!nouveauModal);
    }
    if (id === 5) {
      setPdfModal(!pdfModal);
    }
  };

  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const articlesData = await getArticle();
    setArticles(articlesData);
  };
  const handleAddArticle = async (newArticle) => {
    console.log("Article ajouté au tableau :", newArticle);
    setArticles((prevArticles) => {
      const updatedArticles = [...prevArticles, newArticle];
      console.log("Mise à jour des articles :", updatedArticles);
      return updatedArticles;
    });
  };

  const handleUpdateArticle = (updatedArticle) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.ref_article === updatedArticle.ref_article
          ? updatedArticle
          : article
      )
    );
  };

  const handleDeleteArticle = async (ref_article) => {
    try {
      const response = await deleteArticle(ref_article);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.ref_article !== ref_article)
      );
      if (response.status === 200) {
        console.log("Articles a ete bien supprimer");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  const ExitNouveau = () => {
    setNouveauModal(false);
    setExterieurModal(false);
  };

  const ExitPdf = () => {
    setPdfModal(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      {/* ---------navbar------------ */}
      <Navbar />

      {/* -----------title----------- */}
      <header className="w-full header-background">
        <div className="max-w-7xl mx-auto flex flex-col items-center py-20">
          <a
            className="font-bold text-gray-100 uppercase hover:text-gray-400 text-5xl"
            href="#"
          >
            Gestion de Stock
          </a>
          <p className="text-lg text-gray-200">
            Direction du Système d' Information
          </p>
        </div>
      </header>

      {/* -------------navig----------- 
      <nav className="w-full py-4 border-t border-b bg-gray-100">
        <div className="w-full flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="w-full container mx-auto flex flex-col sm:flex-row sm:flex-wrap items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            <div className="scroll-container w-full flex flex-wrap justify-center">
              {datatitle.map((item) => (
                <a
                  href="#"
                  onClick={() => handleTitleClick(item.idTitle)}
                  className={`scrollh hover:bg-gray-300 rounded py-2 px-4 mx-2 my-2 ${
                    selectedArticle === item.idTitle ? "bg-gray-300" : ""
                  }`}
                  key={item.idTitle}
                  aria-current={
                    selectedArticle === item.idTitle ? "page" : undefined
                  }
                >
                  {item.libelles}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

       ----------article-------- */}
      <div className="container mx-auto py-2">
        <section className="flex flex-wrap justify-center w-full mx-auto px-3">
          {dataarticle
            .filter((items) =>
              selectedArticle === 1 ? true : items.idArticle === selectedArticle
            )
            .map((items) => (
              <article
                className={`flex flex-col sm:flex-row w-full sm:w-60 h-auto sm:h-16 shadow my-4 mx-2 sm:mx-8 rounded transform transition-transform duration-1000 hover:scale-105  
                ${
                  items.idArticle === 2
                    ? "bg-gradient-to-tr from-blue-900 to-blue-400 text-white"
                    : "bg-gray-100"
                }`}
                key={items.idArticle}
                onClick={() => handleClickNouveau(items.idArticle)}
              >
                <div className={`flex justify-center items-center px-2 py-2 w-full ${ items.idArticle === 5 ? "sm:w-14 h-14" : "sm:w-16 h-16" }`}>
                  <img
                    src={items.image}
                    className="max-h-16 max-w-16 object-contain"
                  />
                </div>
                <div className="flex justify-center items-center text-center sm:text-left">
                  <a
                    href="#"
                    className={`text-sm font-bold uppercase ${
                      items.idArticle === 2 ? "text-gray-200" : "text-blue-800"
                    }`}
                  >
                    {items.title}
                  </a>
                </div>
              </article>
            ))}
          {exterieurModal && <Exterieur onClose={ExitNouveau} />}
          {nouveauModal && (
            <NouveauModal
              onClose={ExitNouveau}
              onAddArticle={handleAddArticle}
            />
          )}
          {pdfModal && <PdfModal onExit={ExitPdf} />}
        </section>

        {/* -------------tableau---------- */}
        <TableauStocks
          articles={articles}
          handleAddArticle={handleAddArticle}
          handleUpdateArticle={handleUpdateArticle}
          handleDeleteArticle={handleDeleteArticle}
        />
      </div>

      <footer className="w-full border-t bg-white pb-12">
        <div className="w-full container mx-auto flex flex-col items-center">
          <div className="flex flex-col md:flex-row text-center md:text-left md:justify-between py-6">
            <a href="#" className="uppercase px-3">
              About Us
            </a>
            <a href="#" className="uppercase px-3">
              Privacy Policy
            </a>
            <a href="#" className="uppercase px-3">
              Terms & Conditions
            </a>
            <a href="#" className="uppercase px-3">
              Contact Us
            </a>
          </div>
          <div className="uppercase pb-6">&copy; 2024 G-STOCK | MFA - DSI</div>
        </div>
      </footer>
    </>
  );
}

export default Home;
