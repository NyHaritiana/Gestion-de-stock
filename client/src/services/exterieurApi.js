import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/exterieurs/";
const TOKEN = localStorage.getItem("authToken");

export const getExterieur = async () => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      const response = await axios.get(`${API_BASE_URL}getExterieur`, {
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

export const createExterieur = async (exterieurData) => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      let data = JSON.stringify(exterieurData);
      const response = await axios.post(`${API_BASE_URL}addExterieur`, data, {
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

export const deleteExterieur = async (num_affaire) => {
    if (!TOKEN) {
      throw new Error("No token found");
    }
  
    try {
      const response = await axios.delete(
        `${API_BASE_URL}deleteExterieur/${num_affaire}`, {
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