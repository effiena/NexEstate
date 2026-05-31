const BASE_URL = "";

// ================= GET LISTINGS =================
export async function getListings() {
  try {
    const res = await fetch(`/api/search`);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
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
    const res = await fetch(`/api/listing-images/${folder}`);

    if (!res.ok) {
      throw new Error("Failed to load images");
    }

    return await res.json();
  } catch (err) {
    console.error("getListingImages error:", err);
    return [];
  }
}

// ================= CREATE LISTING =================
export async function createListing(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api/listings`, {
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

  const res = await fetch(`/api/listings/${id}`, {
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

  const res = await fetch(`/api/listings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}
