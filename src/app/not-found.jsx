"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">

      {/* 404 Text */}
      <h1 className="text-7xl font-bold text-[#d4af37] mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-400 mb-6 text-center max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Button */}
      <Link href="/">
        <button className="bg-[#d4af37] text-black px-6 py-2 rounded hover:scale-105 transition">
          Go Back Home
        </button>
      </Link>

    </div>
  );
}