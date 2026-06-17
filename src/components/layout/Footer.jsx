"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // 💡 ফ্রেমর মোশন ইম্পোর্ট করা হলো

const Footer = () => {
  // 💡 মাউসের পজিশন এবং হোভার স্টেট
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#051610] overflow-hidden py-20 transition-colors duration-300"
    >
      {/* 🌊 ১. স্পটলাইট মাস্ক লেয়ার যা মাউসকে ফলো করবে */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0 dark:opacity-100 transition-all duration-300 ease-out"
        style={{
          WebkitMaskImage: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, black 0%, black ${isHovered ? "45%" : "20%"}, transparent 80%)`,
          maskImage: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, black 0%, black ${isHovered ? "45%" : "20%"}, transparent 80%)`,
        }}
      >
        {/* 🔮 ২. জাদুর অ্যানিমেটেড পানির ঢেউ (Framer Motion + SVG) */}
        <div className="absolute inset-0 h-full w-full opacity-30 flex flex-col justify-between p-0 pointer-events-none select-none">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              {/* আমরা একটি ডাইনামিক ওয়েভ রিলেটেড প্যাটার্ন তৈরি করলাম */}
              <pattern
                id="animated-waves"
                width="80"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                {/* 🌊 মোশন পাথ: যা লুপ আকারে বাম থেকে ডানে পানির মতো কাঁপতে থাকবে */}
                <motion.path
                  d="M 0 30 Q 20 10, 40 30 T 80 30"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="1.5"
                  animate={{
                    // 🔄 এটি লাইনটিকে ডানে-বামে এবং ওপরে-নিচে পানির মতো দোলাবে
                    x: [0, -80],
                    y: isHovered ? [0, -3, 3, 0] : 0,
                  }}
                  transition={{
                    x: { repeat: Infinity, ease: "linear", duration: 4 }, // অনবরত বামে সরবে
                    y: { repeat: Infinity, ease: "easeInOut", duration: 2 }, // আলতো করে ওপরে নিচে কাঁপবে
                  }}
                />
                <motion.path
                  d="M 0 5 Q 20 -15, 40 5 T 80 5"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="1.2"
                  opacity="0.5"
                  animate={{
                    x: [-80, 0], // এই লাইনটি উল্টো দিকে যাবে যেন রিয়েল ঢেউ মনে হয়
                    y: isHovered ? [0, 2, -2, 0] : 0,
                  }}
                  transition={{
                    x: { repeat: Infinity, ease: "linear", duration: 6 },
                    y: { repeat: Infinity, ease: "easeInOut", duration: 2.5 },
                  }}
                />
              </pattern>
            </defs>
            {/* পুরো ব্যাকগ্রাউন্ড জুড়ে অ্যানিমেটেড ঢেউটি সেট করা হলো */}
            <rect width="100%" height="100%" fill="url(#animated-waves)" />
          </svg>
        </div>
      </div>

      {/* 📝 ৩. ফুটারের মেইন কন্টেন্ট লেয়ার (relative z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hire
                <span className="text-green-600">Edge</span>
              </h2>
            </div>
            <p className="mt-6 max-w-md text-gray-600 dark:text-white/60 leading-8">
              AI-powered hiring platform connecting talented professionals with
              leading companies worldwide. Build your future with smarter
              recruiting.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <div className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:border-green-500 hover:text-green-500 text-gray-700 dark:text-white transition-all duration-300">
                X
              </div>
              <div className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:border-green-500 hover:text-green-500 text-gray-700 dark:text-white transition-all duration-300">
                in
              </div>
              <div className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:border-green-500 hover:text-green-500 text-gray-700 dark:text-white transition-all duration-300">
                G
              </div>
            </div>
          </div>

          {/* Links: Product */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
              Product
            </h3>
            <div className="space-y-4">
              <Link
                href="/jobs"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                href="/companies"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Companies
              </Link>
              <Link
                href="/talent"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Talent Search
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Links: Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
              Company
            </h3>
            <div className="space-y-4">
              <Link
                href="/about"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/careers"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Careers
              </Link>
              <Link
                href="/blog"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Links: Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
              Resources
            </h3>
            <div className="space-y-4">
              <Link
                href="/help"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/security"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600 transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="relative mt-20 p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-[#10251F]/40 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Stay Updated
              </h3>
              <p className="mt-2 text-gray-600 dark:text-white/60">
                Get hiring trends, job opportunities, and product updates.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full lg:w-[320px] px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#051610] outline-none text-foreground focus:border-green-500 dark:focus:border-green-500 transition-all"
              />
              <button className="px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer transition-all active:scale-95 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-gray-600 dark:text-white/50">
            © 2026 HireEdge. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-white/50 hover:text-green-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 dark:text-white/50 hover:text-green-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-gray-600 dark:text-white/50 hover:text-green-600 transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
