import Link from "next/link";
import JobCard from "../shared/JobCard";
import { getAllJobs } from "@/lib/api/jobs";

const TrendingJobs = async () => {
  // 🎯 ১. ব্যাকএন্ডের অল-ইন-ওয়ান এপিআই থেকে রেসপন্স অবজেক্টটি আনা হলো
  const apiResponse = await getAllJobs();

  // 🎯 ২. জাদুর লাইন: অবজেক্টের ভেতর থেকে আসল জবের অ্যারে (apiResponse.jobs) বের করা হলো
  // যদি কোনো কারণে এপিআই ডাউন থাকে, তবে ক্র্যাশ ঠেকাতে ব্যাকআপ হিসেবে খালি অ্যারে [] দেওয়া হলো
  const jobsList = apiResponse?.jobs || [];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Light Mode Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden" />

      {/* Dark Mode Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 blur-[180px] rounded-full" />

      <div className="relative z-10 w-11/12 mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-500 border border-green-500/20">
              🔥 Trending Opportunities
            </span>

            <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              Discover Your Next Career Move
            </h2>

            <p className="mt-3 text-muted-foreground max-w-2xl">
              Explore the most in-demand jobs from top companies around the
              world. Find opportunities that match your skills and career goals.
            </p>
          </div>

          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-2 px-5 h-11 rounded-xl border border-border bg-card/80 backdrop-blur-xl hover:border-green-500/30 hover:text-green-500 transition-all duration-300 shadow-sm"
          >
            View All Jobs →
          </Link>
        </div>

        {/* Jobs Grid (🎯 ফিক্সড: jobsList ব্যবহার করে লেটেস্ট প্রথম ৬টি চাকরি ডাইনামিক রেন্ডার) */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {jobsList?.slice(0, 6).map((job) => (
            <JobCard
              key={job._id ? job._id.toString() : Math.random()}
              job={job}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex md:hidden justify-center mt-10">
          <Link
            href="/jobs"
            className="w-full text-center py-3 rounded-xl border border-border bg-card text-sm font-medium hover:text-green-500 transition-all"
          >
            View All Jobs →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;
