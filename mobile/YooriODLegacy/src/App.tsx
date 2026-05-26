import PropertyCard from "./components/PropertyCard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-yellow-50 to-zinc-200">

      {/* HEADER */}
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-yellow-700">
          Yoori OD Legacy Property
        </h1>

        <p className="text-gray-600 mt-2">
          Buy • Sell • Rent Properties in Johor
        </p>
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
