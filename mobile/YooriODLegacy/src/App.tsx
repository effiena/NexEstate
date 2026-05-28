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

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/15 rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.45)] min-h-[720px] flex items-center justify-center">

            {/* BACKGROUND LOGO */}
            <img
              src="/yoori.png"
              alt="OD Legacy Logo"
              className="absolute inset-0 w-full h-full object-contain opacity-15 scale-110 pointer-events-none select-none"
            />

            <div className="relative z-20 text-center px-8 md:px-14 py-20">

              <p className="text-yellow-400 tracking-[0.4em] text-xs uppercase mb-6">
                ONE DREAM LEGACY Trusted Property Consultant
              </p>

              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide">
                <span className="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
                  YA |
                </span>{" "}
                <span className="text-yellow-400 drop-shadow-[0_0_22px_rgba(234,179,8,0.85)]">
                  One Dream Legacy Property
                </span>
              </h1>

              <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Building Trust For Your Future Home.
                Premium Property Consultant Specializing In Buying, Selling & Renting Properties Across Johor.
              </p>

              <div className="mt-10 flex justify-center">
                <div className="w-52 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>

              <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">

                <a
                  href="https://wa.me/60109688408"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(234,179,8,0.45)]">
                    WhatsApp Yoori Ann
                  </button>
                </a>

                <button className="border border-yellow-400/40 hover:border-yellow-400 hover:bg-white/10 text-yellow-400 font-semibold px-8 py-4 rounded-full transition-all duration-300">
                  View Listings
                </button>

              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ================= PROPERTY LISTINGS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="mb-12 text-center">

          <p className="text-yellow-400 uppercase tracking-[0.3em] text-xs mb-3">
            Featured Listings
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Houses For Sale
          </h2>

          <div className="mt-6 flex justify-center">
            <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>

        </div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* ================= PROPERTY 1 ================= */}
          <PropertyCard
            folder="pulai"
            title="Pulai Merak Flat (Level 4 Unit)"
            location="Kangkar Pulai, Johor Bahru"
            price="RM 178K"
            details={[
              "Level 4 Unit",
              "2 Bedrooms | 1 Bathroom",
              "505 sqft",
              "Freehold",
              "Non-Bumi Lot",
              "Fully Renovated",
              "Security Main Door",
              "Fully Tiled Flooring",
              "Plaster Ceiling",
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
              "Food & Eateries",
            ]}
            attractions={[
              "Below Market Value RM200k",
              "High Rental Demand Area",
              "Move-In Ready Unit",
              "Strategic Kangkar Pulai Location",
              "Affordable Entry Investment",
            ]}
          />

          {/* ================= PROPERTY 2 ================= */}
          <PropertyCard
            folder="bandarserialam"
            title="Low Cost Double Storey House Bandar Seri Alam"
            location="Jalan Tasek 22, Masai, Johor"
            price="RM 408K"
            details={[
              "775 sqft",
              "4 Bedrooms | 2 Bathrooms",
              "Extended Unit",
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
              "AEON Mall Seri Alam",
              "Masai Town",
              "Pasir Gudang Highway",
            ]}
            nearby={[
              "Schools",
              "Restaurants",
              "Clinics",
              "Convenience Stores",
              "Highway Access",
            ]}
            attractions={[
              "Affordable Double Storey Home",
              "Move-In Ready Condition",
              "Strategic Seri Alam Location",
              "Good Investment Potential",
              "Family Friendly Area",
            ]}
          />

          {/* ================= PROPERTY 3 ================= */}
          <PropertyCard
            folder="tamanskudai"
            title="Double Storey Terrace House Taman Skudai Baru"
            location="Jalan Ronggeng 12, Tun Aminah, Johor"
            price="RM 648K"
            details={[
              "Land Size 22' x 70'",
              "4 Bedrooms | 3 Bathrooms",
              "Upstairs Family Hall",
              "Fully Extended Front & Back",
              "Parking Up To 3 Cars",
              "Fully Renovated",
              "Fully Tiled",
              "Facing South East",
              "Leasehold Until 2082",
              "Peaceful Neighbourhood",
            ]}
            landmarks={[
              "Sutera Mall",
              "Impian Emas",
              "Perling",
              "Nusa Bestari",
              "Tun Aminah",
            ]}
            nearby={[
              "Restaurants & Cafes",
              "Schools",
              "Clinics",
              "Convenience Stores",
              "Highway Access",
            ]}
            attractions={[
              "Prime Skudai Location",
              "Below Market Value RM660k++",
              "Move-In Ready Home",
              "Spacious Family Layout",
              "High Investment Potential",
            ]}
          />

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 YA One Dream Legacy Property • Building Trust For Your Future Home
        </p>
      </footer>

    </div>
  );
}
