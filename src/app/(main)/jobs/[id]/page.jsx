import JobDetails from "@/components/shared/JobDetails";
import { getJobDetailsById } from "@/lib/api/jobs";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const jobs = await getJobDetailsById(id);

  console.log(jobs);

  return (
    <div>
      <JobDetails jobs={jobs} />
    </div>
  );
};

export default JobDetailsPage;
