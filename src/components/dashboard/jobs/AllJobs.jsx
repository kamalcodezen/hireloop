import Image from "next/image";
import Link from "next/link";
import { companiesData, getCompaniesJobs } from "@/lib/api/jobs";
import {
  Calendar,
  DollarSign,
  MapPin,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { getLoggedRecruiterCompany } from "@/lib/api/companies";

const AllJobsPage = async () => {
  const company = await getLoggedRecruiterCompany();

  const jobs = (await getCompaniesJobs(company._id)) || [];

  return (
    <section className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Jobs</h1>

          <p className="text-muted-foreground mt-1">
            Manage and track your job postings.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="
            h-11
            px-5
            rounded-xl
            bg-green-600
            hover:bg-green-700
            text-white
            flex
            items-center
            justify-center
            font-medium
          "
        >
          + Post Job
        </Link>
      </div>

      {/* Jobs */}
      <div className="space-y-4">
        {jobs?.map((job) => (
          <div
            key={job._id}
            className="
              bg-card
              border
              border-border
              rounded-2xl
              p-5
              hover:shadow-lg
              transition-all
            "
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-6">
              {/* Left */}
              <div>
                {/* Title */}
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold">{job.title}</h2>

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      bg-green-500/10
                      text-green-600
                    "
                  >
                    {job.status}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mt-1">
                  {job.company}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      bg-blue-500/10
                      text-blue-600
                    "
                  >
                    {job.type}
                  </span>

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      bg-purple-500/10
                      text-purple-600
                    "
                  >
                    {job.category}
                  </span>

                  {job.isRemote && (
                    <span
                      className="
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        bg-green-500/10
                        text-green-600
                      "
                    >
                      Remote
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-wrap gap-6 mt-5 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign size={16} />
                    <span>
                      {job.currency} {job.salaryMin} -{job.salaryMax}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={16} />
                    <span>
                      {job.isRemote ? "Remote" : `${job.city}, ${job.country}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={16} />
                    <span>{job.deadline}</span>
                  </div>
                </div>

                {/* Applicants */}
                <div className="flex items-center mt-5">
                  <Image
                    src="https://i.pravatar.cc/100?img=11"
                    alt="Applicant"
                    width={34}
                    height={34}
                    className="rounded-full border-2 border-background"
                  />

                  <Image
                    src="https://i.pravatar.cc/100?img=12"
                    alt="Applicant"
                    width={34}
                    height={34}
                    className="rounded-full border-2 border-background -ml-2"
                  />

                  <Image
                    src="https://i.pravatar.cc/100?img=13"
                    alt="Applicant"
                    width={34}
                    height={34}
                    className="rounded-full border-2 border-background -ml-2"
                  />

                  <span className="ml-3 text-sm text-muted-foreground">
                    12 Applicants
                  </span>
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex lg:flex-col gap-2">
                <Link
                  href={`/dashboard/recruiter/jobs/${job._id}`}
                  className="
                    w-10
                    h-10
                    rounded-xl
                    border
                    border-border
                    hover:bg-muted
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                  title="Details"
                >
                  <Eye size={16} />
                </Link>

                <Link
                  href={`/dashboard/recruiter/jobs/edit/${job._id}`}
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-green-500/10
                    text-green-600
                    hover:bg-green-500/20
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                  title="Edit"
                >
                  <Pencil size={15} />
                </Link>

                <button
                  title="Delete"
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-red-500/10
                    text-red-500
                    hover:bg-red-500/20
                    flex
                    items-center
                    justify-center
                    transition-all
                    cursor-pointer
                  "
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllJobsPage;
