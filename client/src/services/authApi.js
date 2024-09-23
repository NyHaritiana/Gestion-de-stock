import axios from "axios";

export async function auth(formData) {
    try {
      let data = JSON.stringify(formData);
      const response = await axios.post(`http://localhost:5193/api/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status, response.data);
      return response;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
}   