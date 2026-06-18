"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function Forbidden() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-white dark:bg-[#051610] overflow-hidden px-6 py-12">
      {/* 🌊 Premium Spotlight Mask & Green Dot-Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full opacity-100 transition-opacity duration-300"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, black 40%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, black 40%, transparent 80%)",
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#16a34a0a_1px,transparent_1px),linear-gradient(to_bottom,#16a34a0a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 📦 Main Content Card */}
      <div className="relative z-10 max-w-md w-full text-center">
        {/* 🛡️ Glowing Red Shield Alert Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl h-16 w-16 mx-auto" />
          <div className="h-16 w-16 rounded-2xl border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-500 shadow-inner">
            <ShieldAlert size={32} className="animate-pulse" />
          </div>
        </div>

        {/* 🛑 403 Error Heading */}
        <h1 className="text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
          403
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-gray-800 dark:text-gray-200">
          Access Forbidden
        </h2>

        <p className="mt-4 text-sm text-gray-600 dark:text-white/60 leading-6">
          Sorry, you don't have permission to access this page. This area is
          strictly reserved for authorized accounts (Admin/Recruiter) only.
        </p>

        {/* 🛠️ Action Buttons Panel */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Smart Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm text-gray-700 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-white/[0.05] transition-all cursor-pointer active:scale-95 text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {/* Home Button */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all active:scale-95 shadow-md text-sm cursor-pointer"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
