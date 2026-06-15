import Link from "next/link";
import {
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  ArrowRight,
  Bookmark,
} from "lucide-react";

const JobDetails = ({ jobs }) => {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Light Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden" />

      {/* Dark Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 blur-[180px] rounded-full" />

      <div className="relative z-10 w-11/12 max-w-6xl mx-auto my-3">
        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-green-500 mb-8"
        >
          ← Back to Jobs
        </Link>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-8 md:p-10">
          <div className="absolute top-0 right-0 h-52 w-52 bg-green-500/10 blur-3xl rounded-full" />

          <div className="relative">
            {/* Company */}
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="h-24 w-24 rounded-lg border border-border bg-background flex items-center justify-center">
                <img
                  src={jobs.companyLogo}
                  alt={jobs.companyName}
                  className="h-14 w-14 object-contain"
                />
              </div>

              <div>
                <p className="text-green-500 font-medium">{jobs.companyName}</p>

                <h1 className="text-4xl md:text-5xl font-bold mt-2">
                  {jobs.title}
                </h1>

                <div className="flex flex-wrap gap-4 mt-4 text-muted-foreground">
                  <span>{jobs.companyLocation}</span>
                  <span>•</span>
                  <span>{jobs.type}</span>
                  <span>•</span>
                  <span>{jobs.category}</span>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-green-500">
                ${jobs.salaryMin} - ${jobs.salaryMax}
              </h2>

              <p className="text-muted-foreground mt-1">Annual Salary Range</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={`/jobs/${jobs?._id}/apply`}
                className="
                  py-2
                  px-8
                  rounded-xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  flex
                  items-center
                  gap-2
                  transition-all cursor-pointer
                "
              >
                Apply Now
                <ArrowRight size={18} />
              </Link>

              <button
                className="
                  h-12
                  px-8
                  rounded-xl
                  border
                  border-border
                  hover:bg-muted
                  flex
                  items-center
                  gap-2 cursor-pointer
                "
              >
                <Bookmark size={18} />
                Save Job
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <div className="rounded-lg border border-border bg-card p-5">
            <MapPin className="text-green-500 mb-3" size={22} />
            <p className="text-sm text-muted-foreground">Location</p>
            <h3 className="font-semibold mt-1">
              {jobs.city}, {jobs.country}
            </h3>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <Briefcase className="text-green-500 mb-3" size={22} />
            <p className="text-sm text-muted-foreground">Job Type</p>
            <h3 className="font-semibold mt-1">{jobs.type}</h3>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <Building2 className="text-green-500 mb-3" size={22} />
            <p className="text-sm text-muted-foreground">Category</p>
            <h3 className="font-semibold mt-1">{jobs.category}</h3>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <Calendar className="text-green-500 mb-3" size={22} />
            <p className="text-sm text-muted-foreground">Deadline</p>
            <h3 className="font-semibold mt-1">{jobs.deadline}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mt-8">
          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4">Responsibilities</h2>

            <p className="leading-8 text-muted-foreground">
              {jobs.responsibilities}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4">Requirements</h2>

            <p className="leading-8 text-muted-foreground">
              {jobs.requirements}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-4">Benefits</h2>

            <p className="leading-8 text-muted-foreground">{jobs.benefits}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-5">About Company</h2>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl border border-border bg-background flex items-center justify-center">
                <img
                  src={jobs.companyLogo}
                  alt={jobs.companyName}
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div>
                <h3 className="font-semibold text-lg">{jobs.companyName}</h3>

                <p className="text-muted-foreground">{jobs.companyLocation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Apply Bar */}
        <div
          className="
            fixed
            bottom-5
            left-1/2
            -translate-x-1/2
            w-[95%]
            max-w-4xl
            rounded-full
            border
            border-border
            bg-card/90
            backdrop-blur-xl pl-8
            p-4
            flex
            items-center
            justify-between
            z-50
          "
        >
          <div>
            <h4 className="font-bold">{jobs.title}</h4>
            <p className="text-sm text-muted-foreground">{jobs.companyName}</p>
          </div>

          <Link
            href={`/jobs/${jobs?._id}/apply`}
            className="
              py-3
              px-8
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
              font-medium cursor-pointer
            "
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
