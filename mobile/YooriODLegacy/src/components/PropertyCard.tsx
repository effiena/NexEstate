import { useEffect, useState } from "react";
import { getListingImages } from "../api/listing";

export default function PropertyCard({
  folder,
  title,
  location,
  price,
  details = []
}) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  // LOAD IMAGES FROM BACKEND
  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getListingImages(folder);
        setImages(data);
      } catch (err) {
        console.error("Image load error:", err);
      }
    }

    loadImages();
  }, [folder]);

  // AUTO SLIDER (optional nice touch)
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="bg-white border border-yellow-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all">

      {/* IMAGE SECTION */}
      <div className="h-56 bg-gray-100 relative overflow-hidden">

        {images.length > 0 ? (
          <img
            src={images[current]}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-5xl">
            🏡
          </div>
        )}

        {/* PRICE TAG */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm shadow">
          {price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">

        <h3 className="text-xl font-bold mb-1">{title}</h3>

        <p className="text-gray-600 mb-3">{location}</p>

        {/* DETAILS */}
        {details.length > 0 && (
          <div className="text-sm text-gray-700 space-y-1 mb-4">
            {details.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </div>
        )}

        {/* ACTION */}
        <div className="flex justify-between items-center border-t pt-4">

          <button className="text-yellow-600 font-semibold">
            View Details
          </button>

          <a
            href="https://wa.me/60104576907"
            target="_blank"
            className="text-green-500 text-xl"
          >
            💬
          </a>

        </div>
      </div>
    </div>
  );
}
