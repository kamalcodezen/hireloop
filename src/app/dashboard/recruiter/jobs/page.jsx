import { companiesData } from "@/lib/api/jobs";

const RecruiterJobs = async () => {
  const company = "infosys";
  const jobs = await companiesData(company);
  console.log(jobs, "jbs");

  return (
    <div>
      <h2>All Jobs</h2>
    </div>
  );
};

export default RecruiterJobs;
