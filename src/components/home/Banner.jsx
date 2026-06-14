"use client";

import { Search, MapPin, ArrowRight, Briefcase } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden pt-34 pb-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Light Mode Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden" />

      {/* Dark Mode Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 blur-[180px] rounded-full" />

      <div className="max-w-11/12 mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-green-500/20 bg-green-500/10">
              <Briefcase size={18} className="text-green-600 animate-pulse" />

              <span className="font-semibold text-green-600">
                50,000+ New Opportunities Added This Month
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-16">
              Find Your Next
              <br />
              <span className="text-green-600">Career Edge</span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-7">
              HireEdge connects ambitious professionals with world-class
              companies. Discover verified opportunities, track applications
              intelligently and accelerate your career with AI-powered hiring
              tools.
            </p>

            {/* Search */}
            <div className="mt-9 rounded-3xl border border-border bg-card p-3 shadow-xl">
              <div className="grid lg:grid-cols-[1fr_1fr_auto] gap-3">
                <div className="flex items-center gap-3 px-4">
                  <Search size={22} className="text-muted-foreground" />

                  <input
                    type="text"
                    placeholder="Job title, skill or company"
                    className="w-full bg-transparent outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 px-4 border-l border-border">
                  <MapPin size={22} className="text-muted-foreground" />

                  <input
                    type="text"
                    placeholder="Location or Remote"
                    className="w-full bg-transparent outline-none"
                  />
                </div>

                <button
                  className="
                  h-12
                  px-8
                  rounded-2xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-semibold
                  flex
                  items-center
                  gap-2
                  justify-center
                "
                >
                  Search
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Trending */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground">Trending Roles</span>

              {[
                "AI Engineer",
                "Product Designer",
                "Frontend Developer",
                "Data Scientist",
                "DevOps Engineer",
              ].map((item) => (
                <span
                  key={item}
                  className="
                  px-4
                  py-2
                  rounded-full
                  border
                  border-border
                  bg-card
                  text-sm
                "
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-10">
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

              <div>
                <h3 className="text-4xl font-bold text-green-600">98%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative">
            {/* Globe */}
            <div
              className="
              w-[500px]
              h-[500px]
              mx-auto
              rounded-full
              border
              border-green-500/20
              bg-gradient-to-br
              from-green-500/10
              to-transparent
              backdrop-blur-xl
              relative
            "
            >
              <div className="absolute inset-0 rounded-full border border-green-500/20 animate-pulse" />

              <div className="absolute inset-10 rounded-full border border-green-500/20" />

              <div className="absolute inset-20 rounded-full border border-green-500/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl">🌍</span>
              </div>
            </div>

            {/* Google Card */}
            <div
              className="
              absolute
              top-24
              right-0
              p-4
              rounded-2xl
              bg-card
              border
              border-border
              shadow-xl
            "
            >
              <h4 className="font-semibold">Google</h4>

              <p className="text-sm text-muted-foreground">12K+ Jobs</p>
            </div>

            {/* Meta Card */}
            <div
              className="
              absolute
              top-52
              right-8
              p-4
              rounded-2xl
              bg-card
              border
              border-border
              shadow-xl
            "
            >
              <h4 className="font-semibold">Meta</h4>

              <p className="text-sm text-muted-foreground">8K+ Jobs</p>
            </div>

            {/* Spotify Card */}
            <div
              className="
              absolute
              bottom-24
              right-0
              p-4
              rounded-2xl
              bg-card
              border
              border-border
              shadow-xl
            "
            >
              <h4 className="font-semibold">Spotify</h4>

              <p className="text-sm text-muted-foreground">5K+ Jobs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
