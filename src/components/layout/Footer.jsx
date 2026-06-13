"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#081C15]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">
          {/* Brand */}
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

            <div className="flex gap-4 mt-8">
              <div className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:border-green-500 transition-all">
                X
              </div>

              <div className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:border-green-500 transition-all">
                in
              </div>

              <div className="w-11 h-11 rounded-xl border border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:border-green-500 transition-all">
                G
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
              Product
            </h3>

            <div className="space-y-4">
              <Link
                href="/jobs"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Browse Jobs
              </Link>

              <Link
                href="/companies"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Companies
              </Link>

              <Link
                href="/talent"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Talent Search
              </Link>

              <Link
                href="/pricing"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
              Company
            </h3>

            <div className="space-y-4">
              <Link
                href="/about"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                About Us
              </Link>

              <Link
                href="/careers"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Careers
              </Link>

              <Link
                href="/blog"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5">
              Resources
            </h3>

            <div className="space-y-4">
              <Link
                href="/help"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Help Center
              </Link>

              <Link
                href="/privacy"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Terms of Service
              </Link>

              <Link
                href="/security"
                className="block text-gray-600 dark:text-white/60 hover:text-green-600"
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-20 p-8 rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#10251F]">
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
                className="
                h-12
                w-full
                lg:w-[320px]
                px-4
                rounded-xl
                border
                border-gray-200
                dark:border-white/10
                bg-white
                dark:bg-[#081C15]
                outline-none
              "
              />

              <button
                className="
                px-6
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium cursor-pointer
              "
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-gray-600 dark:text-white/50">
            © 2026 HireEdge. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-white/50 hover:text-green-600"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-gray-600 dark:text-white/50 hover:text-green-600"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="text-gray-600 dark:text-white/50 hover:text-green-600"
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
