const BASE_URL = process.env.REACT_APP_BASE_URL;

//Fetches data from a specified BASE_URL using a GET request
export async function index() {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}

//Sends data to the specified BASE_URL using a POST request
export async function create(data) {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(BASE_URL, config);

  if (res.ok) {
    return res.json();
  } else {
    console.log(res.statusText)
    throw new Error("Invalid Request");
  }
}

//Fetches data for a specific item based on its ID from the specified BASE_URL
export async function show(id) {
  const URL = `${BASE_URL}/${id}`;
  const config = {
    method: "GET",
  };
  const res = await fetch(URL, config);
  console.log(res);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

//Deletes a specific item based on its ID from the specified BASE_URL
export async function destroy(id) {
  const URL = `${BASE_URL}/${id}`;
  const config = {
    method: "DELETE",
  };
  const res = await fetch(URL, config);
  console.log(res);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

