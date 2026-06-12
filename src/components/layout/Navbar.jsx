"use client";
import logo from "../../../public/images/logo 1.png";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Avatar } from "@heroui/react";
import { usePathname } from "next/navigation";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { toast } from "react-toastify";
import Image from "next/image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Browse Jobs", path: "/" },
    { label: "Company", path: "/" },
    { label: "Pricing", path: "/" },
  ];

  const user = false;
  const isPending = false;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 pt-5">
        <div className="w-[95%] max-w-7xl mx-auto">
          <div className="h-[72px] rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-[0_15px_50px_rgba(0,0,0,0.65)] px-6 lg:px-8 flex items-center">
            {/* Logo */}
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                width={125}
                height={32}
                className="object-contain"
              />
            </Link>

            {/* Desktop Menu + Auth */}
            <div className="hidden md:flex items-center gap-10 ml-auto">
              {links.map((link, ind) => (
                <Link
                  key={ind}
                  href={link.path}
                  className={`text-sm font-medium transition-all duration-300 ${
                    pathname === link.path
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="h-5 w-px bg-white/10 mx-2" />

              <Link
                href="/login"
                className="text-[#6F63FF] text-sm font-medium"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#5B5AF7] to-[#7268FF] text-white text-sm font-medium shadow-[0_0_25px_rgba(111,99,255,0.35)]"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden ml-auto w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-2xl"
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-[88%] max-w-sm z-[70] transition-all duration-500 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-[#111111]/95 backdrop-blur-2xl border-r border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <Image src={logo} alt="logo" width={120} height={30} />

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-2xl"
            >
              <HiX />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 px-6 py-8">
            <div className="space-y-3">
              {links.map((link, ind) => (
                <Link
                  key={ind}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                    pathname === link.path
                      ? "bg-gradient-to-r from-[#5B5AF7]/20 to-[#7268FF]/20 border border-[#6F63FF]/30 text-white"
                      : "bg-white/[0.02] border border-white/5 text-white/70 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{link.label}</span>

                  <IoIosArrowDroprightCircle
                    className={`text-xl ${
                      pathname === link.path
                        ? "text-[#7268FF]"
                        : "text-white/30"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="p-6 border-t border-white/10">
            <div className="space-y-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center h-12 rounded-xl border border-white/10 bg-white/5 text-white"
              >
                Sign In
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center h-12 rounded-xl bg-gradient-to-r from-[#5B5AF7] to-[#7268FF] text-white font-medium shadow-[0_0_25px_rgba(111,99,255,0.35)]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
