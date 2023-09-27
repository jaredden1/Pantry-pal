const SPOON_URL = process.env.REACT_APP_SPOON_BASE_URL;

//Fetches data from a specified APP_URL using a GET request
export async function index() {
  const res = await fetch(SPOON_URL, {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}

//Sends data to the specified APP_URL using a POST request to send JSON data to an API endpoint
export async function fetchApiResults(data) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(SPOON_URL, config);

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error("Invalid Request");
  }
}