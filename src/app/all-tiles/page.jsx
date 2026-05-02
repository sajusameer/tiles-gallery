"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllTiles() {
  const [tiles, setTiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tiles")
      .then((res) => res.json())
      .then((data) => {
        const allTiles = Array.isArray(data) ? data : data.tiles;
        setTiles(allTiles);
      });
  }, []);

  // 🔍 filter
  const filteredTiles = tiles.filter((tile) =>
    tile.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black text-white min-h-screen px-4 py-10">

      {/* 🔍 Search Bar */}
      <div className="max-w-3xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search tiles..."
          className="w-full p-3 rounded bg-[#111] border border-[#d4af37] outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧱 Tiles Grid */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {filteredTiles.map((tile) => (
          <div
            key={tile.id}
            className="bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:shadow-[#d4af37]/20 transition"
          >
            <img
              src={tile.image}
              alt={tile.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{tile.title}</h3>

              <Link href={`/tile/${tile.id}`}>
                <button className="mt-3 border border-[#d4af37] text-[#d4af37] px-4 py-1 rounded hover:bg-[#d4af37] hover:text-black transition">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}