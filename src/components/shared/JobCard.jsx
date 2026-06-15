import Link from "next/link";

const JobCard = ({ job }) => {
  return (
    <div className="group relative overflow-hidden rounded-md border border-border bg-card">
      {/* Light Mode Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden" />

      {/* Dark Mode Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/12 blur-[180px] rounded-full" />

      {/* Normal View */}
      <div className="p-6 transition-all duration-500 group-hover:-translate-y-full">
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-24   flex items-center justify-center">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="h-16 w-16 object-contain"
            />
          </div>

          <h3 className="mt-5 text-xl font-bold">{job.title}</h3>

          <p className="mt-1 text-muted-foreground">{job.companyName}</p>

          <div className="mt-4 space-y-2">
            <p className="text-green-500 font-semibold">
              ${job.salaryMin} - ${job.salaryMax}
            </p>

            <p className="text-sm text-muted-foreground">
              {job.city}, {job.country}
            </p>
          </div>

          <Link
            href={`/jobs/${job._id}`}
            className="
          mt-5
          h-10
          px-5
          rounded-xl
          bg-green-600
          hover:bg-green-700
          text-white
          inline-flex
          items-center
        "
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Hover Content */}
      <div
        className="
      absolute
      inset-0
      p-6
      bg-card
      translate-y-full
      group-hover:translate-y-0
      transition-all
      duration-500
      flex
      flex-col
    "
      >
        <div className="flex justify-between">
          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs">
            {job.type}
          </span>

          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs">
            {job.category}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold">{job.title}</h3>

        <p className="mt-3 text-sm text-muted-foreground line-clamp-4">
          {job.responsibilities}
        </p>

        <div className="mt-4 space-y-2 text-sm">
          <p>📅 Deadline: {job.deadline}</p>

          <p>👥 24 Applicants</p>

          <p>🎁 {job.benefits}</p>
        </div>

        <Link
          href={`/jobs/${job._id}`}
          className="
        mt-auto
        h-11
        rounded-xl
        bg-green-600
        hover:bg-green-700
        text-white
        flex
        items-center
        justify-center
      "
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
