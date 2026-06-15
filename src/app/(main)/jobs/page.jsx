import JobCard from "@/components/shared/JobCard";
import { getAllJobs } from "@/lib/api/jobs";

const AllJobs = async () => {
  const jobs = await getAllJobs();

  return (
    <div className="w-11/12 mx-auto pt-25">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {jobs.slice(3, jobs.length).map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AllJobs;
