// Importing the axios library for making HTTP requests
import axios from "axios";

// Setting the base URL for the API from environment variables
const SPOON_URL = process.env.REACT_APP_SPOON_BASE_URL;

// Function to fetch data from the SPOON_URL using a GET request
export async function index() {
  try {
    const response = await axios.get(SPOON_URL);

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Invalid Request");
  }
}

// Function to send data to the SPOON_URL using a POST request
export async function fetchApiResults(data) {
  try {
    const response = await axios.post(SPOON_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : "Invalid Request");
  }
}
