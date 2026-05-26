const BASE_URL = "http://127.0.0.1:5000";

// GET LISTINGS
export async function getListings() {
  const res = await fetch(`${BASE_URL}/search`);
  return await res.json();
}

// CREATE LISTING
export async function createListing(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/listings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

// UPDATE LISTING
export async function updateListing(id, data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

// DELETE LISTING
export async function deleteListing(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
