import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getAllJobs } from "@/lib/api/jobs";

export default async function Page() {
  const jobs = await getAllJobs();

  return (
    <section className="relative overflow-hidden min-h-screen py-20">
      {/* Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden" />

      {/* Dark Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 blur-[180px] rounded-full" />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="mb-5 text-center">
          <h1 className=" text-5xl md:text-6xl font-bold">
            Find Your Dream Job
          </h1>

          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of opportunities from top companies around the
            world.
          </p>
        </div> */}

        <JobListingContainer initialJobs={jobs || []} />
      </div>
    </section>
  );
}
