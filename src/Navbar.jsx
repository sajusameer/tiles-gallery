"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // 🔐 real session
  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session;

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-black text-white border-b border-[#d4af37]">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#d4af37]">
          TilesGallery
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-[#d4af37]">Home</Link>
          <Link href="/all-tiles" className="hover:text-[#d4af37]">All Tiles</Link>
          <Link href="/my-profile" className="hover:text-[#d4af37]">My Profile</Link>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">

          {isPending ? (
            <span className="text-gray-400">...</span>
          ) : !isLoggedIn ? (
            <Link
              href="/login"
              className="bg-[#d4af37] text-black px-4 py-1 rounded"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/my-profile"
                className="text-[#d4af37]"
              >
                {session.user.name || "Profile"}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-[#d4af37] text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 p-4 bg-[#0a0a0a]">
          <Link href="/">Home</Link>
          <Link href="/all-tiles">All Tiles</Link>
          <Link href="/my-profile">My Profile</Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-[#d4af37] text-black px-4 py-2 rounded"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}