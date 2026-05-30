
const BASE_URL = "https://welcoming-alignment-production-2b55.up.railway.app";

export const getListingImages = async (folder) => {
  try {
    const res = await fetch(`${BASE_URL}/listing-images/${folder}`);

    const contentType = res.headers.get("content-type");

    // 🚨 BLOCK HTML RESPONSES
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Not JSON response:", await res.text());
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
};

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
