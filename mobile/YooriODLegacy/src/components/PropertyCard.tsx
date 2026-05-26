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
  attractions = []
}) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  // swipe control
  const [touchStart, setTouchStart] = useState(0);

  // ================= LOAD IMAGES =================
  useEffect(() => {
    async function loadImages() {
      try {
        const data = await getListingImages(folder);
        setImages(data || []);
      } catch (err) {
        console.error("Image load error:", err);
      }
    }

    loadImages();
  }, [folder]);

  // ================= AUTO SLIDER (CARD ONLY) =================
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  // ================= MODAL CONTROL (ESC KEY) =================
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  // ================= IMAGE NAV =================
  function nextImage() {
    setCurrent((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }

  // ================= SWIPE =================
  function handleTouchStart(e) {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e) {
    const end = e.changedTouches[0].clientX;

    if (touchStart - end > 50) nextImage();
    if (end - touchStart > 50) prevImage();
  }

  return (
    <>
      {/* ================= CARD ================= */}
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white border border-yellow-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
      >
        {/* IMAGE */}
        <div className="h-56 relative bg-gray-100 overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[current]}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-5xl">
              🏡
            </div>
          )}

          {/* PRICE */}
          <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm shadow">
            {price}
          </div>
        </div>

        {/* TEXT */}
        <div className="p-6">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-600">{location}</p>
          <p className="mt-3 text-yellow-600 font-semibold">
            Tap to view details →
          </p>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON (floating safe) */}
            <button
              onClick={() => setOpen(false)}
              className="fixed top-4 right-4 z-[60] bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
            >
              ✕
            </button>

            {/* IMAGE SLIDER */}
            <div
              className="relative h-96 bg-black"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {images.length > 0 ? (
                <img
                  src={images[current]}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-white text-4xl">
                  🏡
                </div>
              )}

              {/* NAV */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
              >
                ◀
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full"
              >
                ▶
              </button>

              {/* PRICE */}
              <div className="absolute bottom-3 right-3 bg-yellow-400 text-black px-4 py-1 rounded-full font-bold">
                {price}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-gray-600">{location}</p>

              {/* DETAILS */}
              {details.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Details</h3>
                  {details.map((d, i) => (
                    <p key={i}>• {d}</p>
                  ))}
                </div>
              )}

              {/* LANDMARK */}
              {landmarks.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Landmarks</h3>
                  {landmarks.map((l, i) => (
                    <p key={i}>📍 {l}</p>
                  ))}
                </div>
              )}

              {/* NEARBY */}
              {nearby.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Nearby</h3>
                  {nearby.map((n, i) => (
                    <p key={i}>🏙️ {n}</p>
                  ))}
                </div>
              )}

              {/* ATTRACTIONS */}
              {attractions.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Attractions</h3>
                  {attractions.map((a, i) => (
                    <p key={i}>✨ {a}</p>
                  ))}
                </div>
              )}

              {/* WHATSAPP */}
              <a
                href="https://wa.me/60104576907"
                target="_blank"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full mt-4"
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
