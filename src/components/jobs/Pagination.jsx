"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page = 1,
  total = 1,
  onChange,
  isCompact = true,
  showControls = true,
  showShadow = true,
  color = "success",
}) {
  // 🔢 ডট ডট (...) সহ স্মার্ট পেজ নাম্বার জেনারেট করার লজিক
  const getPageNumbers = () => {
    const pages = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");

      const start = Math.max(2, page - 1);
      const end = Math.min(total - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < total - 2) pages.push("ellipsis");
      pages.push(total);
    }
    return pages;
  };

  if (total <= 1) return null;

  // 🎨 থিম কালার ম্যাপিং (color="success" হলে সবুজ কালার হবে)
  const activeColorClass =
    color === "success"
      ? "bg-green-600 text-white border-green-500 shadow-green-600/20"
      : "bg-blue-600 text-white border-blue-500 shadow-blue-600/20";

  return (
    <div className="w-full flex items-center justify-center gap-1.5 select-none font-sans mt-12">
      {/* ◀️ আগের পেজের বাটন (Previous Button) */}
      {showControls && (
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className={`flex items-center justify-center rounded-xl border border-white/10 bg-[#051610] text-white/60 hover:text-white hover:border-green-500/30 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 ${
            isCompact ? "w-9 h-9" : "w-11 h-11"
          }`}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* 🔢 পেজ নাম্বার বাটন লুপ */}
      {getPageNumbers().map((p, i) => {
        if (p === "ellipsis") {
          return (
            <span
              key={`ellipsis-${i}`}
              className="flex items-center justify-center text-white/40 text-sm tracking-widest w-9 h-9"
            >
              ...
            </span>
          );
        }

        const isActive = p === page;

        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer active:scale-95 ${
              isCompact ? "w-9 h-9" : "w-11 h-11"
            } ${
              isActive
                ? `${activeColorClass} border ${showShadow ? "shadow-lg" : ""}`
                : "border border-white/5 bg-white/[0.02] text-white/50 hover:bg-white/5 hover:text-white hover:border-white/10"
            }`}
          >
            {p}
          </button>
        );
      })}

      {/* ▶️ পরের পেজের বাটন (Next Button) */}
      {showControls && (
        <button
          disabled={page === total}
          onClick={() => onChange(page + 1)}
          className={`flex items-center justify-center rounded-xl border border-white/10 bg-[#051610] text-white/60 hover:text-white hover:border-green-500/30 disabled:opacity-20 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 ${
            isCompact ? "w-9 h-9" : "w-11 h-11"
          }`}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
