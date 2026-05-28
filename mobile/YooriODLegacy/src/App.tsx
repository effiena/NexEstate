import PropertyCard from "./components/PropertyCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">

      {/* ================= PREMIUM HERO HEADER ================= */}
      <header className="relative px-6 py-14">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

        {/* GOLD GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.22),transparent_55%)]" />

        {/* HERO CONTAINER */}
        <div className="relative z-10 max-w-6xl mx-auto">

          <div
            className="
              relative
              overflow-hidden
              backdrop-blur-2xl
              bg-white/10
              border border-white/15
              rounded-[40px]
              shadow-[0_8px_40px_rgba(0,0,0,0.45)]
              min-h-[720px]
              flex items-center justify-center
            "
          >

            {/* FULL BACKDROP LOGO */}
            <img
              src="/yoori.png"
              alt="OD Legacy Logo"
              className="
                absolute inset-0
                w-full h-full
                object-contain
                opacity-15
                scale-110
                pointer-events-none
                select-none
              "
            />

            {/* CONTENT */}
            <div className="relative z-20 text-center px-8 md:px-14 py-20">

              {/* TOP TEXT */}
              <p className="text-yellow-400 tracking-[0.4em] text-xs uppercase mb-6">
                Trusted Property Consultant
              </p>

              {/* MAIN TITLE */}
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide">

                <span
                  className="
                    text-white
                    drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]
                  "
                >
                  YA |
                </span>{" "}

                <span
                  className="
                    text-yellow-400
                    drop-shadow-[0_0_22px_rgba(234,179,8,0.85)]
                  "
                >
                  OD Legacy Property
                </span>

              </h1>

              {/* SUBTITLE */}
              <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Building Trust For Your Future Home.
                Premium Property Consultant Specializing In
                Buying, Selling & Renting Properties Across Johor.
              </p>

              {/* DIVIDER */}
              <div className="mt-10 flex justify-center">
                <div className="w-52 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>

              {/* CONTACT */}
              <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">

                <button
                  className="
                    bg-yellow-400
                    hover:bg-yellow-300
                    text-black
                    font-semibold
                    px-8 py-4
                    rounded-full
                    transition-all duration-300
                    shadow-[0_0_25px_rgba(234,179,8,0.45)]
                  "
                >
                  WhatsApp Yoori Ann
                </button>

                <button
                  className="
                    border border-yellow-400/40
                    hover:border-yellow-400
                    hover:bg-white/10
                    text-yellow-400
                    font-semibold
                    px-8 py-4
                    rounded-full
                    transition-all duration-300
                  "
                >
                  View Listings
                </button>

              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ================= PROPERTY LISTINGS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        {/* SECTION TITLE */}
        <div className="mb-12 text-center">

          <p className="text-yellow-400 uppercase tracking-[0.3em] text-xs mb-3">
            Featured Listings
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Premium Houses For Sale
          </h2>

          <div className="mt-6 flex justify-center">
            <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>

        </div>

        {/* PROPERTY GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* PROPERTY 1 */}
          <PropertyCard
            folder="pulai"
            title="2 Bedrooms + 1 Bathroom Pulai Merak Flat"
            location="Kangkar Pulai, Johor Bahru"
            price="RM 178K"
            details={[
              "Level 4",
              "2 Bedrooms | 1 Bathroom",
              "505 sqft",
              "Freehold",
              "Non-Bumi Lot",
              "Fully Renovated",
              "Security Main Door",
              "Modern Plaster Ceiling",
              "Bathroom Mosaic Finish",
              "Built-In Kitchen Table Top",
            ]}
            landmarks={[
              "Universiti Teknologi Malaysia (UTM)",
              "Skudai–Pontian Highway",
              "Second Link Expressway",
            ]}
            nearby={[
              "U Mall",
              "AEON Mall",
              "Skudai Parade",
              "Paradigm Mall",
              "Schools & Clinics",
              "Mini marts & eateries",
            ]}
            attractions={[
              "Below Market Value",
              "Move-In Ready",
              "Peaceful Residential Environment",
              "Suitable For Rental Investment",
              "High Demand Area",
            ]}
          />

          {/* PROPERTY 2 */}
          <PropertyCard
            folder="bandarserialam"
            title="Landed House 4 Bedrooms + 2 Bathroom Bandar Seri Alam"
            location="Masai, Johor"
            price="RM 408K"
            details={[
              "4 Bedrooms | 2 Bathrooms",
              "775 sqft",
              "Fully Renovated",
              "Extended Kitchen",
              "Master Bedroom Included",
              "Fully Tiled Flooring",
              "Stainless Steel Door",
              "Tiled Car Porch",
              "Kitchen Table Top",
              "Awning Installed",
              "Freehold",
            ]}
            landmarks={[
              "AEON Seri Alam",
              "Pasir Gudang Highway",
              "Masai Town",
            ]}
            nearby={[
              "Schools",
              "Restaurants",
              "Clinics",
              "Convenience Stores",
            ]}
            attractions={[
              "Family Friendly Area",
              "Strategic Investment Location",
              "Move-In Ready",
            ]}
          />

          {/* PROPERTY 3 */}
          <PropertyCard
            folder="tamanskudai"
            title="Landed House 4 Bedrooms + 3 Bathrooms Taman Skudai Baru"
            location="Tun Aminah, Johor"
            price="RM 648K"
            details={[
              "4 Bedrooms | 3 Bathrooms",
              "Land Size 22x70",
              "Upstairs Family Hall",
              "Fully Extended",
              "Parking Up To 3 Cars",
              "Fully Renovated",
              "Fully Tiled",
              "Facing South East",
              "Leasehold Until 2082",
            ]}
            landmarks={[
              "Sutera Mall",
              "Impian Emas",
              "Perling",
              "Nusa Bestari",
            ]}
            nearby={[
              "Tun Aminah",
              "Restaurants & Cafes",
              "Schools & Clinics",
              "Highway Access",
            ]}
            attractions={[
              "Peaceful Chinese Neighbourhood",
              "Prime Skudai Location",
              "Spacious Family Home",
              "Excellent Accessibility",
            ]}
          />

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 text-center">

        <p className="text-gray-500 text-sm">
          © 2026 YA OD Legacy Property • Building Trust For Your Future Home
        </p>

      </footer>

    </div>
  );
}
