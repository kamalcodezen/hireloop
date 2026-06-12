"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo 1.png";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-11/12 mx-auto px-6 lg:px-8 py-20">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-16">
          {/* Left */}
          <div>
            <Image
              src={logo}
              alt="HireLoop"
              width={200}
              height={60}
              className="object-contain"
            />

            <p className="mt-8 max-w-md text-[17px] leading-10 text-white/35">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="flex items-center gap-4 mt-20">
              <Link
                href="/"
                className="w-14 h-14 rounded-xl bg-[#0f0f12] hover:bg-[#1b1b21] transition-all duration-300 flex items-center justify-center"
              >
                <FaFacebookF className="text-white/70 text-2xl" />
              </Link>

              <Link
                href="/"
                className="w-14 h-14 rounded-xl bg-[#4F46E5] flex items-center justify-center"
              >
                <FaPinterestP className="text-white text-2xl" />
              </Link>

              <Link
                href="/"
                className="w-14 h-14 rounded-xl bg-[#0f0f12] hover:bg-[#1b1b21] transition-all duration-300 flex items-center justify-center"
              >
                <FaLinkedinIn className="text-white/70 text-2xl" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[#5B5AF7] text-3xl font-medium mb-10">
              Product
            </h3>

            <ul className="space-y-7">
              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Browse Jobs
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Company
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Job Alerts
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#5B5AF7] text-3xl font-medium mb-10">
              Navigations
            </h3>

            <ul className="space-y-7">
              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-[#5B5AF7] text-3xl font-medium mb-10">
              Resources
            </h3>

            <ul className="space-y-7">
              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Brand Guideline
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="text-white/35 hover:text-white transition-all text-xl"
                >
                  Newsroom
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-white/25 text-lg">Copyright 2026 — HireLoop</p>

          <div className="flex items-center gap-8 text-white/25 text-lg">
            <Link href="/">Terms & Policy</Link>
            <Link href="/">Privacy Guideline</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
