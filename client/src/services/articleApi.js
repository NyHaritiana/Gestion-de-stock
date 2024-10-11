import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/stocks/";
const TOKEN = localStorage.getItem("authToken");

export const getArticle = async () => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}getArticles`, {
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
};

export const createArticle = async (articlesData) => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      let data = JSON.stringify(articlesData);
      const response = await axios.post(`${API_BASE_URL}addArticles`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`,
        },
      });
  
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      throw error;
    }
};

export const editArticle = async (ref_article, articlesData) => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      let data = JSON.stringify(articlesData);
      const response = await axios.put(
        `${API_BASE_URL}updateArticles/${ref_article}`, data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
          },
        });
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      throw error;
    }
  };

  export const deleteArticle = async (ref_article) => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      const response = await axios.delete(
        `${API_BASE_URL}articles/${ref_article}`, {
          headers: {
            "Authorization": `Bearer ${TOKEN}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
      throw error;
    }
  };