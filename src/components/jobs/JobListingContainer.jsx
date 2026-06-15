"use client";

import { useMemo, useState } from "react";
import JobFilters from "./JobFilters";
import JobCard from "../shared/JobCard";
import { motion, AnimatePresence } from "framer-motion";

const JobListingContainer = ({ initialJobs = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "all" ||
        job.type?.toLowerCase() === selectedType.toLowerCase();

      const matchesCategory =
        selectedCategory === "all" ||
        job.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [initialJobs, searchQuery, selectedType, selectedCategory, isRemoteOnly]);

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

      <div className="max-w-7xl mx-auto flex items-center justify-between mb-5">
        <p className="text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-green-500">
            {filteredJobs.length}
          </span>{" "}
          jobs
        </p>
      </div>

      <AnimatePresence mode="wait">
        {filteredJobs.length > 0 ? (
          <motion.div
            key="grid"
            layout
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-7xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 gap-8"
          >
            {filteredJobs.map((job, index) => (
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
                  delay: index * 0.05, // Stagger effect: একটার পর একটা কার্ড আসবে
                }}
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
