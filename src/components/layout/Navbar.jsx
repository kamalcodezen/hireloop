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

  // 🔄 জাদুর হুক: হাইড্রেশন মিসম্যাচ এরর আটকায়
  useEffect(() => {
    setMounted(true);
  }, []);

  // 👤 BetterAuth সেশন অ্যাক্সেস
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  //  লগআউট ফাংশন
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("See you soon! 👋 Logged out successfully", {
            position: "top-right",
            autoClose: 2000,
          });
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  // 🔗 নেভবারের সাধারণ লিংকসমূহ (লেট ব্যবহার করা হলো যেন ডাইনামিক পুশ করা যায়)
  let links = [
    { label: "Browse Jobs", path: "/jobs" },
    { label: "Companies", path: "/" },
    { label: "Pricing", path: "/" },
  ];

  // 🗺️ রাউটিং ম্যাপ
  const dashboardLinks = {
    seeker: "/dashboard/seeker",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
    user: "/dashboard/seeker", // 👑 [FIXED]: ডাটাবেজে যদি ভুল করে "user" রোলও থাকে, সে ক্র্যাশ না করে সীকার ড্যাশবোর্ডে যাবে
  };

  // 🔐 ড্যাশবোর্ড বাটন পুশ লজিককে সুরক্ষিত করা হলো
  if (user?.email) {
    const userRole = user?.role || "seeker";
    links.push({
      label: "Dashboard",
      path: dashboardLinks[userRole] || "/dashboard/seeker", // 🎯 [FIXED]: কোনোভাবেই যেন path এর মান undefined না হয়
    });
  }

  // 🛑 ড্যাশবোর্ডের ভেতরে থাকলে নেভবার হাইড হবে
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {/* ================= NAVBAR START ================= */}
      <header className="fixed top-0 left-0 w-full z-[100]">
        <div className="max-w-7xl mx-auto px-5 pt-0">
          <div className="h-[60px] rounded-2xl bg-white/80 dark:bg-[#081C15]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm flex items-center px-6 lg:px-8">
            {/* 🏢 লোগো অংশ */}
            <Link href="/" className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hire <span className="text-green-600">Edge</span>
              </h2>
            </Link>

            {/* 💻 ডেস্কটপ মেনু পার্ট */}
            <nav className="hidden md:flex items-center gap-10 ml-auto">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.path}
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

            {/* 🌗 থিম টগল এবং লগইন/সাইনআপ বাটন পার্ট */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white transition-all cursor-pointer"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              <>
                {isPending && !user && (
                  <div className="h-10 w-24 animate-pulse rounded-2xl bg-muted" />
                )}

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

                {!isPending && user && (
                  <>
                    <button
                      onClick={handleSignOut}
                      className="h-11 px-5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-[#10251F] transition-all cursor-pointer"
                    >
                      Sign Out
                    </button>

                    <Link
                      href={dashboardLinks[user?.role] || "/dashboard/seeker"} // 👑 [FIXED]: সুরক্ষিত পাথ
                      className="h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-medium flex items-center justify-center transition-all shadow-lg shadow-green-500/20"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </>
            </div>

            {/* 📱 মোবাইল মেনু বাটন */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden ml-auto w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white cursor-pointer"
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </header>

      {/* ================= BACKGROUND OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150]"
        />
      )}

      {/* ================= MOBILE DRAWER MENU ================= */}
      <div
        className={`fixed top-0 left-0 h-screen w-[85%] max-w-sm z-[200] transition-transform duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-white dark:bg-[#081C15] border-r border-gray-200 dark:border-white/10 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Hire <span className="text-green-600">Edge</span>
            </h2>

            <div className="flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-10 h-10 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#10251F] flex items-center justify-center text-gray-700 dark:text-white cursor-pointer"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
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
                onClick={() => setOpen(false)}
                className={`block px-4 py-4 rounded-xl font-medium transition-all ${
                  pathname === link.path
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 dark:bg-[#10251F] text-gray-700 dark:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-4 py-4 rounded-xl font-medium bg-gray-100 dark:bg-[#10251F] text-gray-700 dark:text-white"
            >
              Resources
            </Link>
          </div>

          {/* মোবাইলের একশন বাটন প্যানেল */}
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
                {/* 🎯 [FIXED]: হাইড্রেশন মিসম্যাচ আটকাতে এটিকে Link থেকে Button বানানো হলো */}
                <button
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-medium bg-transparent cursor-pointer"
                >
                  Sign Out
                </button>

                <Link
                  href={dashboardLinks[user?.role] || "/dashboard/seeker"} // 👑 [FIXED]
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer"
                >
                  Dashboard
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
