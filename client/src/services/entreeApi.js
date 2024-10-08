import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/entrees/";
const TOKEN = localStorage.getItem("authToken");

export const getEntree = async () => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}getEntree`, {
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

export const createEntree = async (entreesData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(entreesData);
    const response = await axios.post(`${API_BASE_URL}addEntree`, data, {
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

export const editEntee = async (id_entree, entreesData) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    let data = JSON.stringify(entreesData);
    const response = await axios.put(
      `${API_BASE_URL}entrees/${id_entree}`, data, {
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

export const deleteEntree = async (id_entree) => {
  if (!TOKEN) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.delete(
      `${API_BASE_URL}entrees/${id_entree}`, {
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
