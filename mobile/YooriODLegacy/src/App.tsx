import PropertyCard from "./components/PropertyCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-yellow-50 to-zinc-200">

      {/* HEADER - PREMIUM LUXURY STYLE */}
      <header className="text-center py-14 bg-black text-white relative overflow-hidden">

        {/* subtle gold glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,179,8,0.12),transparent_60%)]" />

        {/* content */}
        <div className="relative z-10">

          <p className="text-yellow-400 tracking-[0.3em] text-xs uppercase mb-4">
            Trusted Property Consultant
          </p>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-wide">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]">
               Yoori |
            </span>{" "}
            
            <span className="text-yellow-400 
            drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] 
            drop-shadow-[0_0_35px_rgba(234,179,8,0.4)]
            ">
            OD Legacy Property
            </span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg">
            Buy • Sell • Rent Properties in Johor
          </p>

          {/* elegant divider */}
          <div className="mt-8 flex justify-center">
            <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>

        </div>
      </header>

      {/* LISTINGS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Featured Listings
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* 1 */}
          <PropertyCard
            folder="pulai"
            title="Pulai Merak Flat"
            location="Johor Bahru"
            price="RM 178K"
            details={[
              "2 Bed 1 Bath",
              "505 sqft",
              "Freehold",
              "Fully Renovated",
              "Non Bumi",
            ]}
          />

          {/* 2 */}
          <PropertyCard
            folder="bandarserialam"
            title="Bandar Seri Alam"
            location="Masai, Johor"
            price="RM 408K"
            details={[
              "4 Bedrooms | 2 Bathrooms",
              "775 sqft",
              "Fully Renovated",
              "Extended Kitchen",
              "Freehold",
            ]}
          />

          {/* 3 */}
          <PropertyCard
            folder="tamanskudai"
            title="Taman Skudai Baru"
            location="Tun Aminah, Johor"
            price="RM 648K"
            details={[
              "4 Bedrooms | 3 Bathrooms",
              "Land 22x70",
              "Fully Extended",
              "Near Sutera Mall",
              "Leasehold until 2082",
            ]}
          />

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t">
        © 2026 Yoori OD Legacy Property
      </footer>

    </div>
  );
}
