"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const email = formData.email;
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("Welcome Back!");

            setTimeout(() => {
              router.refresh();
              router.push("/");
            }, 600);
          },

          onError: (ctx) => {
            toast.error(ctx.error.message || "Login failed");
          },
        },
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="
      min-h-screen
      bg-white
      dark:bg-[#081C15]
      overflow-hidden
      relative
    "
    >
      {/* Glow */}
      <div
        className="
        absolute
        top-0
        left-1/2
        -translate-x-1/2
        w-[900px]
        h-[900px]
        bg-green-500/10
        dark:bg-green-500/20
        blur-[180px]
        rounded-full
      "
      />

      <div
        className="
        relative
        z-10
        w-[95%]
        max-w-7xl
        mx-auto
        min-h-screen
        grid
        lg:grid-cols-2
      "
      >
        {/* LEFT SIDE */}
        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          px-10
          xl:px-16
        "
        >
          <span
            className="
            inline-flex
            items-center
            gap-2
            w-fit
            px-4
            py-2
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
            text-green-600
            font-medium
          "
          >
            <Briefcase size={16} />
            Welcome Back
          </span>

          <h1
            className="
            mt-8
            text-6xl
            font-bold
            leading-tight
            text-gray-900
            dark:text-white
          "
          >
            Continue Your
            <br />
            <span className="text-green-600">Career Journey</span>
          </h1>

          <p
            className="
            mt-8
            text-lg
            leading-8
            text-gray-600
            dark:text-white/60
            max-w-xl
          "
          >
            Access your dashboard, manage applications, discover new
            opportunities and connect with top companies worldwide.
          </p>

          <div className="mt-12 space-y-5">
            {[
              "Track Applications",
              "AI Job Matching",
              "Verified Companies",
              "Real-time Updates",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-600" />

                <span
                  className="
                  text-gray-700
                  dark:text-white/70
                "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            className="
            mt-14
            flex
            gap-10
            flex-wrap
          "
          >
            <div>
              <h3
                className="
                text-4xl
                font-bold
                text-green-600
              "
              >
                50K+
              </h3>

              <p
                className="
                text-gray-600
                dark:text-white/60
              "
              >
                Active Jobs
              </p>
            </div>

            <div>
              <h3
                className="
                text-4xl
                font-bold
                text-green-600
              "
              >
                12K+
              </h3>

              <p
                className="
                text-gray-600
                dark:text-white/60
              "
              >
                Companies
              </p>
            </div>

            <div>
              <h3
                className="
                text-4xl
                font-bold
                text-green-600
              "
              >
                2M+
              </h3>

              <p
                className="
                text-gray-600
                dark:text-white/60
              "
              >
                Candidates
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
          flex
          items-center
          justify-center
          p-5
          lg:p-10
        "
        >
          <div
            className="
            w-full
            max-w-md
            rounded-[32px]
            border
            border-gray-200
            dark:border-white/10
            bg-white/90
            dark:bg-[#10251F]/80
            backdrop-blur-xl
            shadow-2xl
            p-8
          "
          >
            <div className="text-center">
              <h2
                className="
                text-4xl
                font-bold
                text-gray-900
                dark:text-white
              "
              >
                Welcome Back
              </h2>

              <p
                className="
                mt-3
                text-gray-600
                dark:text-white/60
              "
              >
                Login to your HireEdge account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
                >
                  Email Address
                </label>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-white/10
                "
                >
                  <Mail size={18} className="text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
                >
                  Password
                </label>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  h-14
                  px-4
                  rounded-xl
                  border
                  border-gray-200
                  dark:border-white/10
                "
                >
                  <Lock size={18} className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="
                  text-sm
                  text-green-600
                  hover:underline
                "
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="
                w-full
                h-11
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                cursor-pointer
              "
              >
                {loading ? "Signing In..." : "Sign In"}

                <ArrowRight size={18} />
              </button>

              <div className="relative py-2">
                <div className="border-t border-gray-200 dark:border-white/10" />

                <span
                  className="
                  absolute
                  left-1/2
                  -translate-x-1/2
                  -top-2
                  bg-white
                  dark:bg-[#10251F]
                  px-3
                  text-sm
                  text-gray-500
                "
                >
                  OR
                </span>
              </div>

              <button
                type="button"
                className="
                w-full
                h-11
                rounded-xl
                border
                border-gray-200
                dark:border-white/10
                font-medium
                cursor-pointer
              "
              >
                Continue with Google
              </button>
            </form>

            <p
              className="
              text-center
              mt-8
              text-gray-600
              dark:text-white/60
            "
            >
              Don't have an account?
              <Link
                href="/signup"
                className="
                ml-2
                text-green-600
                font-medium
              "
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
