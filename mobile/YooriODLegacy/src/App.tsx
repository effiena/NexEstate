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

           {/* LOGO */}
            <div className="flex justify-center mb-6">
              <img
                src="/yoori.png"
                alt="OD Legacy Logo"
                className="w-[70vw] max-w-[500px] h-auto object-contain"


              />
            </div>

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
          House For Sales
        </h2>

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
      <footer className="text-center py-10 text-gray-500 text-sm border-t">
        © 2026 YA OD Legacy Property
      </footer>

    </div>
  );
}
