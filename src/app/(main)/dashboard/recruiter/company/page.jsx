import { getUserSession } from "@/lib/core/session";
import CompanyProfile from "./CompanyProfile";
import { getRecruiterCompany } from "@/lib/api/companies";

const CompanyPage = async () => {
  const recruiter = await getUserSession();

  const company = await getRecruiterCompany(recruiter?.id);

  return (
    <div>
      <CompanyProfile recruiter={recruiter} recruiterCompany={company} />
    </div>
  );
};

export default CompanyPage;
