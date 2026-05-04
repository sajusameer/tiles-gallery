"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  //  session
  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session;

  //  logout → home
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
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
              {/*  Profile Image */}
              <Link href="/my-profile">
                <img
                  src={
                    session?.user?.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-[#d4af37] object-cover"
                />
              </Link>

              {/* Logout */}
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

      {/*  Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 p-4 bg-[#0a0a0a]">

          <Link href="/">Home</Link>
          <Link href="/all-tiles">All Tiles</Link>
          <Link href="/my-profile">My Profile</Link>

          {isPending ? (
            <span className="text-gray-400">Loading...</span>
          ) : !isLoggedIn ? (
            <Link
              href="/login"
              className="bg-[#d4af37] text-black px-4 py-2 rounded text-center"
            >
              Login
            </Link>
          ) : (
            <>
              {/* Mobile Profile */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    session?.user?.image ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  className="w-10 h-10 rounded-full border border-[#d4af37]"
                />
                <span>{session.user.name}</span>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}