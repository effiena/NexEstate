export default function YooriODLegacyProperty() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-yellow-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-black to-black" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full border border-yellow-500 text-yellow-400 text-sm mb-6">
              One Dream Legacy Property
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Yoori OD Legacy <span className="text-yellow-400">Property</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Trusted property consultant helping clients buy, sell and rent homes with confidence. Discover strategic investments, dream homes and fast property solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-2xl shadow-lg transition-all">
                Buy Property
              </button>

              <button className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-2xl transition-all">
                Sell Property
              </button>

              <button className="border border-white/20 hover:border-yellow-400 px-6 py-3 rounded-2xl transition-all">
                Rent Property
              </button>
            </div>
          </div>

          <div>
            <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 shadow-2xl">
              <div className="h-80 rounded-2xl bg-gradient-to-br from-yellow-400/30 to-zinc-800 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4">🏡</div>
                  <h2 className="text-2xl font-bold text-yellow-400">
                    Trusted Property Agent
                  </h2>
                  <p className="text-gray-300 mt-2">
                    Buy | Sell | Rent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional real estate solutions tailored for homeowners, buyers and investors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-400 transition-all shadow-xl">
            <div className="text-5xl mb-5">🏘️</div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-400">Buy</h3>
            <p className="text-gray-300 leading-relaxed">
              Find your ideal property with trusted guidance and market insights.
            </p>
          </div>

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-400 transition-all shadow-xl">
            <div className="text-5xl mb-5">💰</div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-400">Sell</h3>
            <p className="text-gray-300 leading-relaxed">
              Maximize property exposure and achieve better market value with strategic selling.
            </p>
          </div>

          <div className="bg-zinc-900 border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-400 transition-all shadow-xl">
            <div className="text-5xl mb-5">🔑</div>
            <h3 className="text-2xl font-bold mb-3 text-yellow-400">Rent</h3>
            <p className="text-gray-300 leading-relaxed">
              Explore rental opportunities for homes, condos and investment properties.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="bg-zinc-950 py-20 border-y border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Featured Properties</h2>
              <p className="text-gray-400">Premium listings by Yoori OD Legacy</p>
            </div>

            <button className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-xl hover:bg-yellow-400 hover:text-black transition-all">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-black border border-yellow-500/20 rounded-3xl overflow-hidden shadow-xl hover:border-yellow-400 transition-all"
              >
                <div className="h-52 bg-gradient-to-br from-yellow-400/20 to-zinc-800 flex items-center justify-center text-6xl">
                  🏠
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                      FOR SALE
                    </span>

                    <span className="text-yellow-400 font-bold">
                      RM 580K
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">
                    Bandar Seri Alam
                  </h3>

                  <p className="text-gray-400 mb-5">
                    Renovated Double Storey Home
                  </p>

                  <div className="flex justify-between text-sm text-gray-300 border-t border-white/10 pt-4">
                    <span>4 Bed</span>
                    <span>2 Bath</span>
                    <span>775 sqft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-5">
          Ready To Find Your Dream Property?
        </h2>

        <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
          Connect with Yoori OD Legacy Property today for trusted property consultation and listings.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all">
            WhatsApp Now
          </button>

          <button className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-2xl transition-all">
            View Listings
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-yellow-500/10 py-8 text-center text-gray-500 text-sm">
        © 2026 Yoori OD Legacy Property • Buy • Sell • Rent
      </footer>
    </div>
  );
}
