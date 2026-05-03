"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleRegisterFunc = async (data) => {
    const { email, name, photo, password } = data;

    const { data: res, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
      callbackURL: "/login",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (res) {
      toast.success("Registration successful 🎉");
      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-[#111] border border-[#d4af37] p-6 rounded-xl w-[350px]">

        <h2 className="text-3xl text-center font-bold text-[#d4af37] mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit(handleRegisterFunc)} className="space-y-4">

  {/* Name */}
  <fieldset className="border border-[#d4af37] rounded p-3">
    <legend className="px-2 text-[#d4af37]">Name</legend>
    <input
      type="text"
      placeholder="Type here name"
      className="w-full p-2 rounded bg-black text-white outline-none"
      {...register("name", { required: "Name required" })}
    />
    {errors.name && (
      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
    )}
  </fieldset>

  {/* Photo URL */}
  <fieldset className="border border-[#d4af37] rounded p-3">
    <legend className="px-2 text-[#d4af37]">Photo URL</legend>
    <input
      type="text"
      placeholder="Type here photo url"
      className="w-full p-2 rounded bg-black text-white outline-none"
      {...register("photo", { required: "Photo required" })}
    />
    {errors.photo && (
      <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
    )}
  </fieldset>

  {/* Email */}
  <fieldset className="border border-[#d4af37] rounded p-3">
    <legend className="px-2 text-[#d4af37]">Email</legend>
    <input
      type="email"
      placeholder="Type here email"
      className="w-full p-2 rounded bg-black text-white outline-none"
      {...register("email", { required: "Email required" })}
    />
    {errors.email && (
      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
    )}
  </fieldset>

  {/* Password */}
  <fieldset className="border border-[#d4af37] rounded p-3 relative">
    <legend className="px-2 text-[#d4af37]">Password</legend>

    <input
      type={isShowPassword ? "text" : "password"}
      placeholder="Type here password"
      className="w-full p-2 rounded bg-black text-white outline-none"
      {...register("password", { required: "Password required" })}
    />

    <span
      onClick={() => setIsShowPassword(!isShowPassword)}
      className="absolute right-3 top-3 cursor-pointer text-[#d4af37]"
    >
      {isShowPassword ? <FaEye /> : <FaEyeSlash />}
    </span>

    {errors.password && (
      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
    )}
  </fieldset>

  <button className="w-full bg-[#d4af37] text-black py-2 rounded">
    Register
  </button>
</form>

        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-[#d4af37]">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}