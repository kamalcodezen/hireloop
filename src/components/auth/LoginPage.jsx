"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

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

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get(`redirect`) || "/";

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
              router.push(redirectTo);
            }, 200);
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
    <section className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Glow Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-[95%] max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2">
        {/* LEFT SIDE (Information Panel) */}
        <div className="hidden lg:flex flex-col justify-center px-10 xl:px-16">
          <span className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 font-medium text-sm">
            <Briefcase size={16} />
            Welcome Back
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight">
            Continue Your
            <br />
            <span className="text-green-600">Career Journey</span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-muted-foreground max-w-xl">
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
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 flex gap-10 flex-wrap">
            <div>
              <h3 className="text-4xl font-bold text-green-600">50K+</h3>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">12K+</h3>
              <p className="text-muted-foreground">Companies</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-green-600">2M+</h3>
              <p className="text-muted-foreground">Candidates</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Login Form Card) */}
        <div className="flex items-center justify-center p-5 lg:p-10">
          <div className="w-full max-w-md rounded-[32px] border border-border bg-card/90 backdrop-blur-xl shadow-2xl p-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Welcome Back</h2>
              <p className="mt-3 text-muted-foreground">
                Login to your HireEdge account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground pl-1">
                  Email Address
                </label>
                <div className="flex items-center gap-3 h-14 px-4 rounded-xl border border-border bg-background focus-within:border-green-500 transition-all duration-300">
                  <Mail size={18} className="text-muted-foreground/60" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-transparent outline-none text-foreground placeholder-muted-foreground/40"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground pl-1">
                  Password
                </label>
                <div className="flex items-center gap-3 h-14 px-4 rounded-xl border border-border bg-background focus-within:border-green-500 transition-all duration-300">
                  <Lock size={18} className="text-muted-foreground/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent outline-none text-foreground placeholder-muted-foreground/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground/70 hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* FIXED: Proper Submit Button Instead of Link */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_20px_rgba(34,197,94,0.15)] transition-all"
              >
                {loading ? "Signing In..." : "Sign In"}
                <ArrowRight size={18} />
              </button>

              {/* Divider Line */}
              <div className="relative py-2">
                <div className="border-t border-border" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 bg-card px-3 text-xs font-semibold text-muted-foreground tracking-wider">
                  OR
                </span>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                className="w-full h-12 rounded-xl border border-border bg-background font-medium hover:bg-muted text-foreground cursor-pointer transition-colors"
              >
                Continue with Google
              </button>
            </form>

            {/* Create Account Redirection */}
            <p className="text-center mt-8 text-sm text-muted-foreground">
              Don't have an account?
              <Link
                href={`/signup?redirect=${redirectTo}`}
                className="ml-2 text-green-600 font-semibold hover:underline"
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
