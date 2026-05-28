import PropertyCard from "./components/PropertyCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-x-hidden">

      {/* ================= HERO ================= */}
      <header className="relative px-4 md:px-6 py-10 md:py-14">

        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.22),transparent_55%)]" />

        <div className="relative z-10 max-w-6xl mx-auto">

          <div className="relative overflow-hidden backdrop-blur-2xl bg-white/10 border border-white/15 rounded-[30px] md:rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.45)] min-h-[420px] md:min-h-[720px] flex items-center justify-center">

            <img
              src="/yoori.png"
              alt="OD Legacy Logo"
              className="absolute inset-0 w-full h-full object-contain opacity-10 md:opacity-15 scale-110 pointer-events-none select-none"
            />

            <div className="relative z-20 text-center px-4 md:px-14 py-12 md:py-20">

              <p className="text-yellow-400 tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs uppercase mb-4 md:mb-6">
                ONE DREAM LEGACY Trusted Property Consultant
              </p>

              <h1 className="text-3xl md:text-7xl font-extrabold leading-tight">
                <span className="text-white">YA | </span>
                <span className="text-yellow-400">
                  One Dream Legacy Property
                </span>
              </h1>

              <p className="text-gray-300 mt-4 md:mt-6 text-sm md:text-xl max-w-2xl mx-auto">
                Building Trust For Your Future Home. Premium Property Consultant Across Johor.
              </p>

              <div className="mt-8 md:mt-10 flex justify-center">
                <div className="w-40 md:w-52 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>

              <div className="mt-8 md:mt-10 flex flex-col md:flex-row justify-center gap-3 md:gap-4">

                <a href="https://wa.me/60109688408" target="_blank" rel="noopener noreferrer">
                  <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full">
                    WhatsApp Yoori Ann
                  </button>
                </a>

                <button className="border border-yellow-400/40 text-yellow-400 font-semibold px-6 md:px-8 py-3 md:py-4 rounded-full">
                  View Listings
                </button>

              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ================= LISTINGS ================= */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 md:pb-24">

        <div className="mb-10 md:mb-12 text-center">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-xs mb-3">
            Featured Listings
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            Houses For Sale
          </h2>
        </div>

        {/* GRID FIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

          <PropertyCard folder="pulai" title="2 Bedrooms | 1 Bathroom Pulai Merak Flat (Level 4 Unit)" location="Kangkar Pulai, Johor Bahru" price="RM 178K" details={["2 Bedrooms | 1 Bathroom","505 sqft","Freehold"]} />

          <PropertyCard folder="bandarserialam" title="4 Bedrooms | 2 Bathrooms Bandar Seri Alam" location="Masai, Johor" price="RM 408K" details={["4 Bedrooms","775 sqft","Freehold"]} />

          <PropertyCard folder="tamanskudai" title="4 Bedrooms | 3 Bathrooms Taman Skudai" location="Johor" price="RM 648K" details={["4 Bedrooms","22x70","Leasehold"]} />

          <PropertyCard folder="tamanputeriwangsa" title="3 Bedrooms | 2 Bathrooms Taman Puteri Wangsa" location="Ulu Tiram" price="RM 388K" />

          <PropertyCard folder="tamandatopenggawa_barat" title="Taman Dato Penggawa Barat Terrace" location="Skudai" price="RM 578K" />

          <PropertyCard folder="batupahat_land" title="Land 1.67 Acres Batu Pahat" location="Sri Medan" price="RM 350K" />

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-10 text-center">
        <p className="text-gray-500 text-sm">
          © 2026 YA One Dream Legacy Property
        </p>
      </footer>

    </div>
  );
}
