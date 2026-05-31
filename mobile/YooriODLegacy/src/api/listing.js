// =========================
// BASE URL
// =========================
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://welcoming-alignment-production-2b55.up.railway.app";


// =========================
// GET LISTINGS
// =========================
export async function getListings() {
  try {
    const res = await fetch(`${BASE_URL}/search`);

    if (!res.ok) {
      throw new Error(`GET listings failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("getListings error:", err);
    return [];
  }
}


// =========================
// GET LISTING IMAGES
// =========================
export async function getListingImages(folder) {
  try {
    const res = await fetch(
      `${BASE_URL}/listing-images/${folder}`
    );

    if (!res.ok) {
      throw new Error(
        `GET listing images failed: ${res.status}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("getListingImages error:", err);
    return [];
  }
}


// =========================
// CREATE LISTING
// =========================
export async function createListing(data) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/listings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    if (!res.ok) {
      throw new Error(
        `Create listing failed: ${res.status}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("createListing error:", err);
    return { error: true };
  }
}


// =========================
// UPDATE LISTING
// =========================
export async function updateListing(id, data) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${BASE_URL}/listings/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Update listing failed: ${res.status}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("updateListing error:", err);
    return { error: true };
  }
}


// =========================
// DELETE LISTING
// =========================
export async function deleteListing(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${BASE_URL}/listings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        `Delete listing failed: ${res.status}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("deleteListing error:", err);
    return { error: true };
  }
}
