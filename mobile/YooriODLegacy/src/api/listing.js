const BASE_URL =
  "https://welcoming-alignment-production-2b55.up.railway.app";

// GET LISTINGS
export async function getListings() {
  const res = await fetch(`${BASE_URL}/search`);
  return await res.json();
}

// GET LISTING IMAGES
export async function getListingImages(folder) {
  try {
    const res = await fetch(
      `${BASE_URL}/listing-images/${folder}`
    );

    if (!res.ok) {
      throw new Error("Failed to load images");
    }

    return await res.json();
  } catch (err) {
    console.error("getListingImages error:", err);
    return [];
  }
}

// CREATE LISTING
export async function createListing(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/listings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
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
