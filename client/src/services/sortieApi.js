import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/sorties/";
const TOKEN = localStorage.getItem("authToken");

export const getSortie = async () => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}getSortie`, {
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

export const createSortie = async (sortiesData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(sortiesData);
    const response = await axios.post(`${API_BASE_URL}addSortie`, data, {
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

export const editSortie = async (codeSortie, sortiesData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(sortiesData);
    const response = await axios.put(
      `${API_BASE_URL}sorties/${codeSortie}`, data, {
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

export const deleteSortie = async (codeSortie) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(
      `${API_BASE_URL}sorties/${codeSortie}`, {
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