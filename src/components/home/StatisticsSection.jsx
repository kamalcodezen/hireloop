"use client";

import {
  BriefcaseBusiness,
  Building2,
  UsersRound,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: UsersRound,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatisticsSection() {
  return (
    <section className="relative overflow-hidden bg-black min-h-[950px]">
      {/* Purple Glow */}
      <div className="absolute left-1/2 top-[40px] -translate-x-1/2 w-[1200px] h-[1200px] rounded-full bg-[#5B5AF7]/25 blur-[220px]" />

      {/* Stars */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle,#8b7fff 1.2px,transparent 1.2px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* Globe Background */}
      <div
        className="absolute inset-0 bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: "url('/images/globe.png')",
          backgroundPosition: "center 120px",
          backgroundSize: "1150px",
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="pt-[290px] text-center">
          <h2 className="text-white text-[34px] md:text-[58px] font-light leading-[1.2]">
            Assisting over{" "}
            <span className="font-medium">
              15,000 job seekers
            </span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Cards */}
        <div className="max-w-[1120px] mx-auto mt-[110px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    h-[210px]
                    rounded-[22px]
                    border
                    border-white/10
                    bg-black/60
                    backdrop-blur-xl
                    px-7
                    py-6
                    flex
                    flex-col
                    justify-between
                    shadow-[0_10px_50px_rgba(0,0,0,0.6)]
                  "
                >
                  <Icon
                    size={22}
                    strokeWidth={1.8}
                    className="text-white"
                  />

                  <div>
                    <h3 className="text-[58px] font-semibold text-white leading-none">
                      {item.value}
                    </h3>

                    <p className="mt-5 text-white/85 text-[22px]">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}