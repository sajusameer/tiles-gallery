"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function MyProfile() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // 🔐 protect route
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-[#111] p-6 rounded-xl border border-[#d4af37] w-[350px] text-center">

        <img
          src={user.image}
          alt="user"
          className="w-24 h-24 rounded-full mx-auto mb-4 border border-[#d4af37]"
        />

        <h2 className="text-xl font-bold text-[#d4af37]">
          {user.name}
        </h2>

        <p className="text-gray-400">{user.email}</p>

        <Link href="/update-profile">
          <button className="mt-5 w-full bg-[#d4af37] text-black py-2 rounded hover:opacity-90">
            Update Profile
          </button>
        </Link>
      </div>
    </div>
  );
}