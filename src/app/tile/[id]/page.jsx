import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function TileDetails({ params }) {
  
  const h = await headers();

  const headerObj = {};
  h.forEach((value, key) => {
    headerObj[key] = value;
  });

  // 🔐 session check
  const session = await auth.api.getSession({
    headers: headerObj,
  });

  if (!session) {
    redirect("/login");
  }

  
  const { id } = await params;


const res = await fetch("http://localhost:3000/data.json", {
  cache: "no-store",
});

const data = await res.json();
const tiles = data.tiles || [];

  const tile = tiles.find((t) => String(t.id) === String(id));

  if (!tile) {
    return (
      <p className="text-white text-center mt-10">
        Tile not found: {id}
      </p>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-4 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div>
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-[400px] object-cover rounded"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-[#d4af37]">
            {tile.title}
          </h1>

          <p className="mt-4 text-gray-300">
            {tile.description}
          </p>

          <p className="mt-4">
            <span className="text-[#d4af37] font-semibold">Category:</span>{" "}
            {tile.category}
          </p>

          <p>
            <span className="text-[#d4af37] font-semibold">Material:</span>{" "}
            {tile.material}
          </p>

          <p>
            <span className="text-[#d4af37] font-semibold">Dimensions:</span>{" "}
            {tile.dimensions}
          </p>

          <p className="mt-3 text-[#d4af37] text-xl font-bold">
            ${tile.price}
          </p>

          <p className="mt-2">
            {tile.inStock ? "✅ In Stock" : "❌ Out of Stock"}
          </p>
        </div>

      </div>
    </div>
  );
}