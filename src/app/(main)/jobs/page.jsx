import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getAllJobs } from "@/lib/api/jobs";

export default async function Page({ searchParams }) {
  // 🎯 ১. searchParams সরাসরি একটি অবজেক্ট, এটিকে কোনো ডিস্ট্রাকচার ছাড়া প্রমিজ রিজলভ করতে হবে
  const filters = await searchParams;

  // ⚙️ ২. ফ্রন্টঅ্যান্ড ফিল্টার অবজেক্ট প্রিপেয়ার করা
  const filtersObj = {
    ...filters,
    isRemote: filters.isRemote === "true" ? true : false,
    page: filters.page ? parseInt(filters.page) : 1, // পেজ নাম্বার স্ট্রিং থেকে সংখ্যায় রূপান্তর
  };

  // 🔗 ৩. এপিআই-তে পাঠানোর জন্য কুয়েরি স্ট্রিং তৈরি করা
  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();

  // 🚀 ৪. এপিআই কল করে ডাটা আনা (আমাদের ব্যাকএ্যান্ড এখন অবজেক্ট আকারে { jobs, total } পাঠায়)
  const apiData = (await getAllJobs(queryString)) || { jobs: [], total: 0 };

  return (
    <section className="relative overflow-hidden min-h-screen py-20">
      {/* Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden" />

      {/* Dark Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 blur-[180px] rounded-full" />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto">
        {/* 🎯 ৫. ক্লায়েন্ট কন্টেইনারে এপিআই থেকে পাওয়া ডাটাগুলো সঠিকভাবে পাস করা হলো */}
        <JobListingContainer
          filter={filtersObj}
          jobs={apiData.jobs || []}
          total={apiData.total || 0}
        />
      </div>
    </section>
  );
}
