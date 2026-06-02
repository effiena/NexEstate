const BASE_URL = "https://nexestate-production.up.railway.app";

// ================= GET LISTINGS =================
export async function getListings() {
  try {
    const res = await fetch(`${BASE_URL}/api/listings`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getListings error:", error);
    return [];
  }
}

// ================= GET LISTING IMAGES =================
export async function getListingImages(folder) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/listing-images/${encodeURIComponent(folder)}`
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getListingImages error:", error);
    return [];
  }
}

// ================= CREATE LISTING =================
export async function createListing(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/listings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });

  return await res.json();
}

// ================= UPDATE LISTING =================
export async function updateListing(id, data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/listings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

// ================= DELETE LISTING =================
export async function deleteListing(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/listings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
