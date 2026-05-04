"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  //  protect route + set default data
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }

    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <p className="text-center mt-10 text-white">Loading...</p>;
  }

  if (!session) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      alert(error.message);
    }

    if (data) {
      alert("Profile updated successfully");
      router.push("/my-profile");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleUpdate}
        className="bg-[#111] p-6 rounded-xl border border-[#d4af37] w-[350px]"
      >
        <h2 className="text-2xl text-center mb-5 text-[#d4af37]">
          Update Profile
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 bg-black border border-[#d4af37] rounded outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="w-full mb-4 p-2 bg-black border border-[#d4af37] rounded outline-none"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="w-full bg-[#d4af37] text-black py-2 rounded hover:opacity-90">
          Update Information
        </button>
      </form>
    </div>
  );
}
