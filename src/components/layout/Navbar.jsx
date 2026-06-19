"use client"; // 🌐 নেক্সট জেএস-কে বলা হচ্ছে এটি একটি ক্লায়েন্ট/ব্রাউজার কমপোনেন্ট

import Link from "next/link"; 
import { useState, useEffect } from "react"; 
import { usePathname, useRouter } from "next/navigation"; 
import { useTheme } from "next-themes"; 
import { HiMenu, HiX } from "react-icons/hi"; 
import { Sun, Moon, ChevronDown } from "lucide-react"; 
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify"; 
const Navbar = () => {
  const pathname = usePathname(); 
  const router = useRouter(); 

  const [open, setOpen] = useState(false); 
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme(); 

  // 🔄 জাদুর হুক: পেজ লোড হওয়া মাত্রই mounted-কে true করে দেয়, যা হাইড্রেশন মিসম্যাচ এরর আটকায়
  useEffect(() => {
    setMounted(true);
  }, []);

  // 👤 BetterAuth-এর মাধ্যমে লগইন থাকা ইউজারের সেশন ও ডাটা লাইভ অ্যাক্সেস করা হচ্ছে
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user; // ইউজার অবজেক্ট (ইউজারের নাম, ইমেইল, রোল থাকে এর ভেতর)

  // 🚪 লগআউট বা সাইন আউট করার মূল ফাংশন
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // সফলভাবে লগআউট হলে টোস্ট মেসেজ দেখাবে
          toast.success("See you soon! 👋 Logged out successfully", {
            position: "top-right",
            autoClose: 2000,
          });
          router.push("/"); // লগআউট শেষে হোম পেজে পাঠিয়ে দেওয়া হবে
          router.refresh(); // পেজটি রিফ্রেশ করে সেশন ক্লিন করা হবে
        },
      },
    });
  };

  // 🔗 নেভবারের সাধারণ লিংকগুলোর অ্যারে
  const links = [
    { label: "Browse Jobs", path: "/jobs" },
    { label: "Companies", path: "/" },
    { label: "Pricing", path: "/" },
  ];

  // 🗺️ রোল অনুযায়ী কোন ড্যাশবোর্ডে যাবে, তার রাউটিং ম্যাপ
  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };

  // 🔐 যদি ইউজার লগইন থাকে (ইমেইল পাওয়া যায়), তবে লিংক অ্যারেতে "Dashboard" বাটনটি পুশ বা যোগ করা হবে
  if (user?.email) {
    links.push({
      label: "Dashboard",
      path: dashboardLinks[user?.role || "seeker"], // রোল অনুযায়ী ড্যাশবোর্ড লিংক সেট হবে
    });
  }

  // 🛑 যদি ইউজার অলরেডি ড্যাশবোর্ড পেজের ভেতরে থাকে, তবে এই মেইন নেভবারটি নিজেকে হাইড বা লুকিয়ে ফেলবে (return null)
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {/* ================= NAVBAR START ================= */}
      <header
        className="fixed top-0 left-0 w-full z-[100]"
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-5 pt-0">
          {/* 🎯 ফিক্সড লাইন: লাইন ব্রেক এরর দূর করতে সব ক্লাসকে এক লাইনে আনা হয়েছে */}
          <div className="h-[60px] rounded-2xl bg-white/80 dark:bg-[#081C15]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center px-6 lg:px-8">
            {/* 🏢 লোগো অংশ */}
            <Link href="/" className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hire <span className="text-green-600">Edge</span>
              </h2>
            </Link>

            {/* 💻 ডেস্কটপ মেনু পার্ট (মোবাইলে hidden বা অদৃশ্য থাকবে) */}
            <nav className="hidden md:flex items-center gap-10 ml-auto">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
                  // কারেন্ট পেজের লিংকের কালার সবুজ (text-green-600) হবে, বাকিগুলো নরমাল থাকবে
                  className={`text-sm font-medium transition-all hover:text-green-600 ${
                    pathname === link.path
                      ? "text-green-600"
                      : "text-gray-600 dark:text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-white/70 hover:text-green-600 transition-all cursor-pointer">
                Resources
                <ChevronDown size={16} />
              </button>
            </nav>

            {/* 🌗 ডানদিকের থিম টগল এবং লগইন/সাইনআপ বাটন পার্ট */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              {/* থিম চেঞ্জার বাটন (শুধুমাত্র ক্লায়েন্ট মাউন্ট হওয়ার পরই রেন্ডার হবে) */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white transition-all cursor-pointer"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              <>
                {/* ⏳ ডাটা লোড হওয়ার সময় কঙ্কাল বা ব্লিংকিং অ্যানিমেশন (Skeleton Loader) দেখাবে */}
                {isPending && !user && (
                  <div className="h-10 w-24 animate-pulse rounded-2xl bg-muted" />
                )}

                {/* 🔑 ইউজার লগইন না থাকলে এই "Sign In" এবং "Get Started" বাটন দুটি দেখাবে */}
                {!isPending && !user && (
                  <>
                    <Link
                      href="/login"
                      className="h-11 px-5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#10251F] transition-all"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/signup"
                      className="h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium flex items-center justify-center transition-all shadow-lg shadow-green-500/20"
                    >
                      Get Started
                    </Link>
                  </>
                )}

                {/* 🚪 ইউজার অলরেডি লগইন থাকলে তাকে "Sign Out" করার বাটন দেখাবে */}
                {!isPending && user && (
                  <>
                    <button
                      onClick={handleSignOut}
                      className="h-11 px-5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#10251F] transition-all cursor-pointer"
                    >
                      Sign Out
                    </button>

                    <Link
                      href="/"
                      className="h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium flex items-center justify-center transition-all shadow-lg shadow-green-500/20"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </>
            </div>

            {/* 📱 মোবাইল মেনু বাটন (শুধুমাত্র ছোট স্ক্রিনে বা মোবাইলে দৃশ্যমান হবে) */}
            <button
              onClick={() => setOpen(true)} // ক্লিকে মোবাইল ড্রয়ার ওপেন (true) হবে
              className="md:hidden ml-auto w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white cursor-pointer"
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* ================= BACKGROUND OVERLAY ================= */}
      {/* মোবাইল মেনু খুললে পেজের বাকি অংশ কালো ও ব্লার করার পর্দা */}
      {open && (
        <div
          onClick={() => setOpen(false)} // পর্দায় ক্লিক করলে মেনু আবার বন্ধ হয়ে যাবে
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
        />
      )}

      {/* ================= MOBILE DRAWER MENU ================= */}
      {/* বাম দিক থেকে স্লাইড করে আসা মোবাইল মেনু বক্স */}
      <div
        className={`fixed top-0 left-0 h-screen w-[85%] max-w-sm z-[200] transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full" // open সত্য হলে স্ক্রিনে আসবে, মিথ্যা হলে বামে লুকিয়ে থাকবে
        }`}
      >
        <div className="h-full bg-white dark:bg-[#081C15] border-r border-gray-200 dark:border-white/10 flex flex-col">
          {/* মোবাইল মেনু হেডার ও ক্লোজ (X) বাটন */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hire <span className="text-green-600">Edge</span>
            </h2>

            <div className="flex items-center gap-2">
              {/* মোবাইল ড্রয়ারের ভেতরের থিম টগলার */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white cursor-pointer"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              {/* মোবাইল মেনু বন্ধ করার ক্রস বাটন */}
              <button
                onClick={() => setOpen(false)} // ক্লিকে মেনু বন্ধ (false) হবে
                className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white cursor-pointer"
              >
                <HiX />
              </button>
            </div>
          </div>

          {/* মোবাইল নেভিগেশন লিংকসমূহ */}
          <div className="flex-1 p-6 space-y-3">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.path}
                onClick={() => setOpen(false)} // লিংকে ক্লিক করলে মেনু অটো বন্ধ হয়ে যাবে
                className={`block px-4 py-4 rounded-xl font-medium transition-all ${
                  pathname === link.path
                    ? "bg-green-600 text-white" // একটিভ পেজের ব্যাকগ্রাউন্ড সবুজ হবে
                    : "bg-gray-100 dark:bg-[#10251F] text-gray-700 dark:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/resources"
              onClick={() => setOpen(false)}
              className="block px-4 py-4 rounded-xl font-medium bg-gray-100 dark:bg-[#10251F] text-gray-700 dark:text-white"
            >
              Resources
            </Link>
          </div>

          {/* মোবাইলের একদম নিচের একশন বাটন প্যানেল */}
          <div className="p-6 space-y-3 border-t border-gray-200 dark:border-white/10">
            {!isPending && !user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white"
                >
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
            {!isPending && user && (
              <>
                <Link
                  href="#"
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white cursor-pointer"
                >
                  Sign Out
                </Link>

                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
