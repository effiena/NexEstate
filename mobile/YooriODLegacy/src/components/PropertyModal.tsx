import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function PropertyModal({ property, onClose }) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <div className="bg-white w-[95%] md:w-[80%] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl"
        >
          ✕
        </button>

        {/* IMAGE SLIDER */}
        <Swiper spaceBetween={10} slidesPerView={1}>
          {property.images?.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* DETAILS */}
        <div className="mt-6">

          <h2 className="text-2xl font-bold text-yellow-600">
            {property.title}
          </h2>

          <p className="text-gray-600 mt-2">
            📍 {property.address}
          </p>

          <div className="mt-4 space-y-2 text-gray-700">

            <p>🏡 <b>Landmark:</b> {property.landmark}</p>

            <p>📍 <b>Nearby Area:</b> {property.nearby}</p>

            <p>✨ <b>Attractions:</b> {property.attractions}</p>

            <p>🛏️ {property.bedrooms} Bedrooms | 🛁 {property.bathrooms} Bathrooms</p>

            <p>📐 {property.size_sqft} sqft</p>

          </div>

        </div>

      </div>

    </div>
  );
}
