import FeaturedTiles from "@/FeaturedTiles";
import HeroSlider from "@/HeroSlider";

export default async function Home() {
  const res = await fetch("http://localhost:5000/tiles", {
    cache: "no-store",
  });

  const data = await res.json();

  // ✅ SAFE tiles
  const tiles = Array.isArray(data)
    ? data.slice(0, 4)
    : data?.tiles?.slice(0, 4) || [];

  return (
    <div className="bg-black text-white">
      
      {/* 🔥 Banner / Slider */}
      <HeroSlider />


      {/* 🔥 Marquee */}
<div className="bg-[#111] text-[#d4af37] py-2 overflow-hidden flex items-center">
  
  {/* 🔒 Fixed label */}
  <div className="px-4 font-semibold whitespace-nowrap border-r border-[#d4af37] bg-black">
    New Arrivals:
  </div>

  {/* 🔄 Scrolling text */}
  <div className="flex animate-marquee gap-10 ml-4 whitespace-nowrap">
    <span>Ceramic Blue Tile</span>
    <span>Modern Geometric Patterns</span>
    <span>Join the Community...</span>

    {/* duplicate for smooth loop */}
    <span>Ceramic Blue Tile</span>
    <span>Modern Geometric Patterns</span>
    <span>Join the Community...</span>
  </div>

</div>
      {/* 🔥 Featured Tiles */}
      <FeaturedTiles tiles={tiles} />

    </div>
  );
}