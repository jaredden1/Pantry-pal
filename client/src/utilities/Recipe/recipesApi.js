import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Fetches data from the BASE_URL using a GET request
export async function index() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Invalid Request");
  }
}

// Sends data to the BASE_URL using a POST request
export async function create(data) {
  try {
    // Setting the content type to JSON
    const response = await axios.post(BASE_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.statusText : "Error");
    throw new Error(error.response ? error.response.data : "Invalid Request");
  }
}

// Fetches data for a specific item based on its ID from BASE_URL
export async function show(id) {
  try {
    // Constructing the URL using the BASE_URL and the provided ID
    const URL = `${BASE_URL}/${id}`;
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.statusText : "Error");
    throw new Error(error.response ? error.response.data : "Invalid Request");
  }
}

// Deletes a specific item based on its ID from BASE_URL
export async function destroy(id) {
  try {
    const URL = `${BASE_URL}/${id}`;
    const response = await axios.delete(URL);
    return response.data;
  } catch (error) {
    console.log(error.response ? error.response.statusText : "Error");
    throw new Error(error.response ? error.response.data : "Invalid Request");
  }
}
