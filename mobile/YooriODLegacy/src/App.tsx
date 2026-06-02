import PropertyCard from "./components/PropertyCard";

export default function App() {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-x-hidden">

      {/* ================= PREMIUM HERO HEADER ================= */}
      <header className="relative px-6 py-14">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.22),transparent_55%)]" />

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/15 rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.45)] min-h-[620px] md:min-h-[720px] flex items-center justify-center">

            <img
              src="/yoori.png"
              alt="OD Legacy Logo"
              className="absolute inset-0 w-full h-full object-contain opacity-15 scale-110 pointer-events-none select-none"
            />

            <div className="relative z-20 text-center px-5 sm:px-8 md:px-14 py-14 md:py-20">

              <p className="text-yellow-400 tracking-[0.4em] text-xs uppercase mb-6">
                ONE DREAM LEGACY Trusted Property Consultant
              </p>

              <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-wide">
                <span className="text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]">
                  YA |
                </span>{" "}
                <span className="text-yellow-400 drop-shadow-[0_0_22px_rgba(234,179,8,0.85)]">
                  One Dream Legacy Property
                </span>
              </h1>

              <p className="text-gray-300 mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Building Trust For Your Future Home. Premium Property Consultant Specializing In Buying, Selling & Renting Properties Across Johor.
              </p>

              <div className="mt-10 flex justify-center">
                <div className="w-52 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>

              <div className="mt-10 flex flex-col md:flex-row justify-center gap-4">

                <a href="https://wa.me/60109688408" target="_blank" rel="noopener noreferrer">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          <PropertyCard
            images={[
              "/uploads/pulai/1.jpg",
              "/uploads/pulai/2.jpg",
              "/uploads/pulai/3.jpg"
            ]}
            title="2 Bedrooms | 1 Bathroom Pulai Merak Flat (Level 4 Unit)"
            location="Kangkar Pulai, Johor Bahru"
            price="RM 178K"
            details={[
              "2 Bedrooms | 1 Bathroom",
              "505 sqft",
              "Freehold",
              "Fully Renovated",
              "Non-Bumi Lot",
              "Level 4 Unit",
            ]}
            landmarks={["UTM Skudai", "Skudai Highway"]}
            nearby={["AEON Mall", "U Mall", "Schools"]}
            attractions={["Below Market Value", "High Rental Demand", "Move-In Ready"]}
          />

          <PropertyCard
            images={[
              "/uploads/bandarserialam/1.jpg",
              "/uploads/bandarserialam/2.jpg"
            ]}
            title="4 Bedrooms | 2 Bathrooms Bandar Seri Alam Double Storey House"
            location="Masai, Johor"
            price="RM 408K"
            details={[
              "4 Bedrooms | 2 Bathrooms",
              "775 sqft",
              "Extended Unit",
              "Fully Renovated",
              "Freehold",
            ]}
            landmarks={["AEON Seri Alam", "Pasir Gudang Highway"]}
            nearby={["Schools", "Clinics", "Shops"]}
            attractions={["Family Friendly", "Good Investment", "Move-In Ready"]}
          />

          <PropertyCard
            images={[
              "/uploads/tamanskudai/1.jpg",
              "/uploads/tamanskudai/2.jpg"
            ]}
            title="4 Bedrooms | 3 Bathrooms Taman Skudai Baru Double Storey Terrace"
            location="Tun Aminah, Johor"
            price="RM 648K"
            details={[
              "4 Bedrooms | 3 Bathrooms",
              "22' x 70'",
              "Fully Extended",
              "Renovated",
              "Leasehold 2082",
            ]}
            landmarks={["Sutera Mall", "Impian Emas"]}
            nearby={["Restaurants", "Schools"]}
            attractions={["Prime Location", "High Value Area", "Spacious Home"]}
          />

          <PropertyCard
            images={["/uploads/tamanputeriwangsa/1.jpg"]}
            title="3 Bedrooms | 2 Bathrooms Taman Puteri Wangsa"
            location="Ulu Tiram, Johor"
            price="RM 388K"
            details={["3 Bedrooms | 2 Bathrooms", "770 sqft", "Freehold"]}
            landmarks={["Ulu Tiram Town"]}
            nearby={["Schools", "Shops"]}
            attractions={["Affordable", "Move-In Ready"]}
          />

          <PropertyCard
            images={["/uploads/tamandatopenggawa_barat/1.jpg"]}
            title="Taman Dato Penggawa Barat Terrace House"
            location="Skudai"
            price="RM 578K"
            details={["3 Bedrooms | 2 Bathrooms", "22' x 70'"]}
            landmarks={["Paradigm Mall"]}
            nearby={["Schools", "Restaurants"]}
            attractions={["Prime Location", "Near Mall"]}
          />

          <PropertyCard
            images={["/uploads/batupahat_land/1.jpg"]}
            title="1.67 Acres Land For Sale"
            location="Batu Pahat"
            price="RM 350K"
            details={["Freehold", "Road Access"]}
            landmarks={["Sri Medan Town"]}
            nearby={["Village Area"]}
            attractions={["Investment Ready"]}
          />

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 YooriAnn One Dream Legacy Property • Building Trust For Your Future Home
        </p>
      </footer>

    </div>
  );
}
