"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get(`redirect`) || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    const role = formData.role;
    const plan = role === "seeker" ? "seeker_free" : "recruiter_free";

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      await authClient.signUp.email(
        {
          name,
          email,
          password,
          role,
          plan,
        },
        {
          onRequest: () => {
            setLoading(true);
          },

          onSuccess: () => {
            setLoading(false);
            toast.success("Account created successfully");

            setTimeout(() => {
              router.refresh();
              router.push(redirectTo);
            }, 200);
          },

          onError: (ctx) => {
            setLoading(false);
            toast.error(
              ctx.error.message || "Signup failed | Please try again",
            );
          },
        },
      );
    } catch (error) {
      setLoading(false);
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
      {/* Background Glow */}
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
        max-w-11/12
        mx-auto
        min-h-screen
        grid
        lg:grid-cols-2
      "
      >
        {/* ================= LEFT SIDE ================= */}

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
          {/* Logo */}
          {/* <div className="mb-12">
            <Image src={logo} alt="HireEdge" width={190} height={50} />
          </div> */}

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
            AI Powered Hiring Platform
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
            Find Your Next
            <br />
            <span className="text-green-600">Career Edge</span>
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
            Join thousands of professionals discovering better opportunities
            through AI-powered job matching and smart hiring solutions.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-5">
            {[
              "AI Powered Job Matching",
              "Verified Companies",
              "Track Applications",
              "Real-time Notifications",
            ].map((item) => (
              <div
                key={item}
                className="
                flex
                items-center
                gap-3
              "
              >
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

          {/* Stats */}
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

        {/* ================= RIGHT SIDE ================= */}

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
            {/* Mobile Logo */}
            {/* <div className="lg:hidden flex justify-center mb-8">
              <Image src={logo} alt="logo" width={180} height={40} />
            </div> */}

            <div className="text-center">
              <h2
                className="
                text-4xl
                font-bold
                text-gray-900
                dark:text-white
              "
              >
                Create Account
              </h2>

              <p
                className="
                mt-3
                text-gray-600
                dark:text-white/60
              "
              >
                Start your journey with HireEdge today.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}
              <div>
                <label
                  className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
                >
                  Full Name
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
                  <User size={18} className="text-gray-400" />

                  <input
                    name="name"
                    placeholder="John Doe"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                  />
                </div>
              </div>

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

              {/* Confirm Password */}
              <div>
                <label
                  className="
                  block
                  mb-2
                  text-sm
                  font-medium
                "
                >
                  Confirm Password
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
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                  "
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block mb-3 text-sm font-medium">
                  Select Role
                </label>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="seeker"
                      defaultChecked
                      className="accent-green-600 cursor-pointer"
                    />
                    <span>Job Seeker</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      className="accent-green-600 cursor-pointer"
                    />
                    <span>Recruiter</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <label
                className="
                flex
                items-center
                gap-3
                text-sm 
              "
              >
                <input className="cursor-pointer" type="checkbox" required />

                <span>I agree to the Terms & Conditions</span>
              </label>

              {/* Submit */}
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
                gap-2 cursor-pointer
              "
              >
                {loading ? "Creating Account..." : "Create Account"}

                <ArrowRight size={18} />
              </button>

              {/* Divider */}
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

              {/* Google */}
              <button
                type="button"
                className="
                w-full
                h-11
                rounded-xl
                border
                border-gray-200
                dark:border-white/10
                font-medium cursor-pointer
              "
              >
                Continue with Google
              </button>
            </form>

            {/* Footer */}
            <p
              className="
              text-center
              mt-8
              text-gray-600
              dark:text-white/60
            "
            >
              Already have an account?
              <Link
                href={`/login?redirect=${redirectTo}`}
                className="
                ml-2
                text-green-600
                font-medium
              "
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
