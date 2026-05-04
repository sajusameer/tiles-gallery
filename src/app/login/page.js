"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  //  Email Login
  const handleLoginFunc = async (data) => {
    setLoading(true);

    const { data: res, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (res) {
      toast.success("Login successful 🎉");
      router.push("/");
    }
  };

  //  Google Login
  const handleGoogleLogin = async () => {
    try {
      setGLoading(true);

      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
      }
    } catch (err) {
      toast.error("Google login failed");
    } finally {
      setGLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <div className="bg-[#111] border border-[#d4af37] p-6 rounded-xl w-[350px]">

        {/* Title */}
        <h2 className="text-3xl text-center font-bold text-[#d4af37] mb-6">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLoginFunc)} className="space-y-4">

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-black border border-[#d4af37] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 rounded bg-black border border-[#d4af37] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
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

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full bg-[#d4af37] text-black py-2 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={gLoading}
          className="w-full flex items-center justify-center gap-2 text-white 
          border border-[#d4af37] py-2 rounded mt-4 hover:bg-[#d4af37] hover:text-black transition"
        >
          <FaGoogle />
          {gLoading ? "Loading..." : "Continue with Google"}
        </button>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#d4af37] hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}