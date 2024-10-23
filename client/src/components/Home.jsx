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
  const [filterTable, setFilterTable] = useState(false);

  const handleClickNouveau = (id) => {
    if (id === 2) {
      setFilterTable(!filterTable);
    }
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

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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

  const [searchDesignation, setSearchDesignation] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedNumComptable, setSelectedNumComptable] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  console.log("Rendered searchDesignation:", searchDesignation);
  useEffect(() => {
    setFilteredArticles(
      articles.filter((article) => {
        const matchesDesignation = article.designation
          .toLowerCase()
          .includes(searchDesignation.toLowerCase());

        const articleDate = new Date(article.date);
        const isAfterStartDate = startDate
          ? articleDate >= new Date(startDate)
          : true;
        const isBeforeEndDate = endDate
          ? articleDate <= new Date(endDate)
          : true;

        const matchesNumComptable = selectedNumComptable
          ? article.num_comptable === parseInt(selectedNumComptable, 10)
          : true;

        console.log(
          `Evaluating article: ${article.num_comptable}, Matches: ${matchesNumComptable}`
        );

        return (
          matchesDesignation &&
          matchesNumComptable &&
          isAfterStartDate &&
          isBeforeEndDate
        );
      })
    );
    console.log("Selected Num Comptable:", selectedNumComptable);
  }, [searchDesignation, selectedNumComptable, startDate, endDate, articles]);

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
          <p className="text-xl font-bold text-gray-200 uppercase">
            Ministere des Forces Armees
          </p>
          <p className="text-lg text-gray-200 uppercase">
            Direction du Système d' Information
          </p>
        </div>
      </header>

      {/* -----------article-------- */}
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
                <div
                  className={`flex justify-center items-center px-2 py-2 w-full ${
                    items.idArticle === 5 ? "sm:w-14 h-14" : "sm:w-16 h-16"
                  }`}
                >
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

        {/* ---------filtre------------- */}
        { filterTable && <div className="flex flex-wrap justify-center w-full mx-auto mt-8 px-3">
          <input
            type="text"
            name="designation"
            id="designation"
            placeholder="Désignation"
            className="max-w-full w-1/5 rounded-md mx-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            value={searchDesignation}
            onChange={(e) => {
              setSearchDesignation(e.target.value);
              console.log("Recherche:", e.target.value);
            }}
            onKeyDown={() => console.log("Key pressed!")}
          />
          <select
            id="num_comptable"
            name="num_comptable"
            className="max-w-full w-1/5 h-10 rounded-md mx-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            value={selectedNumComptable}
            onChange={(e) => setSelectedNumComptable(e.target.value)}
          >
            <option>n° comptable</option>
            {articles.length > 0 ? (
              articles.map((article) => (
                <option key={article.ref_article} value={article.num_comptable}>
                  {article.num_comptable}
                </option>
              ))
            ) : (
              <option disabled>Chargement des articles...</option>
            )}
          </select>
          <input
            type="date"
            name="date_i"
            id="date_i"
            value={startDate}
            className="max-w-full w-1/5 rounded-md mx-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            name="date_f"
            id="date_f"
            className="max-w-full w-1/5 rounded-md mx-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div> }

        {/* -----------tableau---------------- */}
        <TableauStocks
          articles={filteredArticles}
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
