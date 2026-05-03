"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleLoginFunc = async (data) => {
    const { data: res, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (res) {
      toast.success("Login successful 🎉");
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-[#111] border border-[#d4af37] p-6 rounded-xl w-[350px]">

        <h2 className="text-3xl text-center font-bold text-[#d4af37] mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLoginFunc)} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-black border border-[#d4af37] text-white"
            {...register("email", { required: "Email required" })}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password */}
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded bg-black border border-[#d4af37] text-white"
              {...register("password", { required: "Password required" })}
            />

            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-3 top-3 cursor-pointer text-[#d4af37]"
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          {/* Button */}
          <button className="w-full bg-[#d4af37] text-black py-2 rounded">
            Login
          </button>
        </form>

        {/* Link */}
        <p className="mt-4 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#d4af37]">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}