import Link from "next/link";

export default function FeaturedTiles({ tiles }) {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">

      {/* Title */}
      <h2 className="text-4xl font-bold text-[#d4af37] mb-12 text-center tracking-wide">
        Featured Tiles
      </h2>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {tiles.map((tile) => (
          
          <div
            key={tile.id}
            className="group bg-[#111] border border-[#222] rounded-xl overflow-hidden shadow-lg hover:shadow-[#d4af37]/20 transition duration-300"
          >

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={tile.image}
                alt={tile.title}
                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#d4af37] transition">
                {tile.title}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Premium Quality Tile
              </p>

              {/* Optional Price */}
              <p className="text-[#d4af37] mt-2 font-semibold">
                ${tile.price}
              </p>

              <Link href={`/tile/${tile.id}`}>
                <button className="mt-4 w-full border border-[#d4af37] text-[#d4af37] py-2 rounded hover:bg-[#d4af37] hover:text-black transition">
                  View Details
                </button>
              </Link>
            </div>

          </div>

        ))}
      </div>
    </section>
  );
}