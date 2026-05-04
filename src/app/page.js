import FeaturedTiles from "@/FeaturedTiles";
import HeroSlider from "@/HeroSlider";

export default async function Home() {
  const res = await fetch("https://tiles-gallery-gamma.vercel.app/data.json", {
    cache: "no-store",
  });

  const data = await res.json();

  //  SAFE tiles
  const tiles = Array.isArray(data)
    ? data.slice(0, 4)
    : data?.tiles?.slice(0, 4) || [];

  return (
    <div className="bg-black text-white">
      
      {/*  Banner / Slider */}
      <HeroSlider />

      {/* marque */}

          <div className="bg-[#111] text-[#d4af37] py-2 flex items-center">

            {/*  Fixed label */}
            <div className="px-4 font-semibold whitespace-nowrap border-r border-[#d4af37] bg-black z-10">
              New Arrivals:
            </div>

            {/* 🔄 Wrapper (important fix) */}
            <div className="overflow-hidden w-full">
              <div className="flex animate-marquee gap-10 ml-4 whitespace-nowrap">
                 <span>Weekly Feature: </span>
                <span> Modern Geometric Patterns |</span>
                <span>Join the Community...</span>

                <span>Ceramic Blue Tile</span>
                <span>Modern Geometric Patterns</span>
                <span>Join the Community...</span>

                {/* duplicate */}
                <span>Ceramic Blue Tile</span>
                <span>Modern Geometric Patterns</span>
                <span>Join the Community...</span>
              </div>
            </div>

          </div>
      {/* Featured Tiles */}
      <FeaturedTiles tiles={tiles} />

    </div>
  );
}