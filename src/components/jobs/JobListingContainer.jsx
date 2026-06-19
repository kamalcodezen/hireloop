"use client";

import { useEffect, useState } from "react";
import JobFilters from "./JobFilters";
import JobCard from "../shared/JobCard";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import Pagination from "./Pagination";

const JobListingContainer = ({ filter: filters, jobs = [], total = 0 }) => {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedType, setSelectedType] = useState(filters.type || "all");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || "all",
  );
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);
  const [page, setPage] = useState(filters.page || 1);

  const router = useRouter();
  const pathname = usePathname();

  // 🎯 যখনই বাইরে থেকে ফিল্টার চেঞ্জ হবে, তখন পেজ নাম্বার আবার ১ এ ফেরত যাবে
  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedType, selectedCategory, isRemoteOnly]);

  // 🔄 ফিল্টার অথবা পেজ নাম্বার চেঞ্জ হলে ইউআরএল আপডেট করার নিরাপদ লজিক
  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) sp.set("search", searchQuery);
    if (selectedType !== "all") sp.set("type", selectedType);
    if (selectedCategory !== "all") sp.set("category", selectedCategory);
    if (isRemoteOnly) sp.set("isRemote", "true");
    if (page > 1) sp.set("page", page); // পেজ ১ এর চেয়ে বড় হলে ইউআরএল-এ যোগ হবে

    const newPath = `${pathname}?${sp.toString()}`;

    // অনন্ত লুপ আটকানোর সেফটি চেক
    if (window.location.search !== `?${sp.toString()}`) {
      router.push(newPath, { scroll: false });
    }
  }, [
    searchQuery,
    selectedType,
    selectedCategory,
    isRemoteOnly,
    page,
    router,
    pathname,
  ]);

  // 📊 পেজিনেশনের হিসাব নিকাশ
  const itemsPerPage = 12;
  const totalPages = Math.ceil(total / itemsPerPage) || 1;

  const startItem = total === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      {/* চাকরির সংখ্যা দেখানোর বার */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-5">
        <p className="text-muted-foreground text-sm">
          Showing{" "}
          <span className="font-semibold text-green-500">
            {startItem}-{endItem}
          </span>{" "}
          of <span className="font-semibold text-green-500">{total}</span> jobs
        </p>
      </div>

      {/* চাকরির কার্ড গ্রিড লেআউট */}
      <AnimatePresence mode="wait">
        {jobs.length > 0 ? (
          <>
            <motion.div
              key="grid"
              layout
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-10"
            >
              {jobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.05,
                  }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>

            {/* 🎯 @heroui/react এর অফিশিয়াল এবং সহজ পেজিনেশন বাটন সিস্টেম */}
            {totalPages > 1 && (
              <div className="w-full flex justify-center mt-12 select-none">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="success"
                  page={page}
                  total={totalPages}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            )}
          </>
        ) : (
          <motion.div
            key="empty"
            className="max-w-4xl mx-auto text-center py-24 rounded-3xl border border-dashed border-border bg-card/50"
          >
            <h3 className="text-2xl font-bold">No Jobs Found</h3>
            <p className="text-muted-foreground mt-3">
              Try changing your filters or search keywords.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default JobListingContainer;
