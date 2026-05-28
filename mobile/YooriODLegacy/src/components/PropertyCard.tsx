import { useEffect, useState } from "react";
import { getListingImages } from "../api/listing";
import { FaWhatsapp } from "react-icons/fa";

export default function PropertyCard({
  folder,
  title,
  location,
  price,
  details = [],
  landmarks = [],
  nearby = [],
  attractions = [],
}) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  // LOAD IMAGES
  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getListingImages(folder);
        setImages(data || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadImages();
  }, [folder]);

  // AUTO SLIDER
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  // SAFE NEXT/PREV
  const next = () => {
    if (!images.length) return;
    setCurrent((p) => (p + 1) % images.length);
  };

  const prev = () => {
    if (!images.length) return;
    setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  };

  return (
    <>
      {/* ================= CARD ================= */}
      <div
        onClick={() => setOpen(true)}
        className="
          cursor-pointer
          bg-white
          text-black
          border border-yellow-200
          rounded-3xl
          overflow-hidden
          shadow-lg
          hover:shadow-2xl
          transition
          flex flex-col
          w-full
          h-full
        "
      >
        {/* IMAGE */}
        <div className="relative w-full h-56 bg-gray-100 flex-shrink-0">
          {images.length > 0 ? (
            <img
              src={images[current]}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🏡
            </div>
          )}

          {/* PRICE */}
          <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
            {price}
          </div>
        </div>

        {/* TEXT (FIX TITLE ISSUE HERE) */}
        <div className="p-5 flex flex-col gap-2">
          <h3 className="text-lg font-bold leading-snug line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-600">{location}</p>

          <p className="text-yellow-600 font-semibold text-sm mt-1">
            Tap to view details →
          </p>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white text-black w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full shadow"
            >
              ✕
            </button>

            {/* IMAGE */}
            <div className="relative h-[40vh] bg-black flex-shrink-0">
              {images.length > 0 ? (
                <img
                  src={images[current]}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-white">
                  🏡
                </div>
              )}

              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
              >
                ◀
              </button>

              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
              >
                ▶
              </button>

              <div className="absolute bottom-3 right-3 bg-yellow-400 px-4 py-1 rounded-full font-bold">
                {price}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-gray-600">{location}</p>

              {details.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  {details.map((d, i) => (
                    <p key={i}>• {d}</p>
                  ))}
                </div>
              )}

              {landmarks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Landmarks</h3>
                  {landmarks.map((l, i) => (
                    <p key={i}>📍 {l}</p>
                  ))}
                </div>
              )}

              {nearby.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Nearby</h3>
                  {nearby.map((n, i) => (
                    <p key={i}>🏙️ {n}</p>
                  ))}
                </div>
              )}

              {attractions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Attractions</h3>
                  {attractions.map((a, i) => (
                    <p key={i}>✨ {a}</p>
                  ))}
                </div>
              )}

              <a
                href="https://wa.me/60109688408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full"
              >
                <FaWhatsapp />
                Contact Agent
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
