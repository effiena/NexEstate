import PropertyCard from "./components/PropertyCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-yellow-50 to-zinc-200">

      {/* ================= GLASSY PREMIUM HEADER ================= */}
      <header className="relative overflow-hidden px-6 py-14">

        {/* DARK BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

        {/* GOLD GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.18),transparent_55%)]" />

        {/* GLASS EFFECT */}
        <div className="relative z-10 max-w-6xl mx-auto">

          <div
            className="
              backdrop-blur-2xl
              bg-white/10
              border border-white/15
              rounded-[40px]
              shadow-[0_8px_32px_rgba(0,0,0,0.35)]
              px-8 md:px-14
              py-14
              text-center
            "
          >

            {/* TOP TEXT */}
            <p className="text-yellow-400 tracking-[0.35em] text-xs uppercase mb-5">
              Trusted Property Consultant
            </p>

            {/* TITLE */}
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
                  drop-shadow-[0_0_18px_rgba(234,179,8,0.85)]
                "
              >
                OD Legacy Property
              </span>

            </h1>

            {/* SUBTITLE */}
            <p className="text-gray-300 mt-6 text-lg">
              Buy • Sell • Rent Properties in Johor
            </p>

            {/* DIVIDER */}
            <div className="mt-8 flex justify-center">
              <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
            </div>

          </div>
        </div>
      </header>

      {/* ================= LISTINGS ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Featured Listings
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* PROPERTY 1 */}
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

          {/* PROPERTY 2 */}
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

          {/* PROPERTY 3 */}
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

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t">
        © 2026 Yoori OD Legacy Property
      </footer>

    </div>
  );
}
