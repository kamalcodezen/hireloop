import { getUserSession } from "@/lib/core/session";
import CompanyProfile from "./CompanyProfile";

const CompanyPage = async () => {
  const recruiter = await getUserSession();

  return (
    <div>
      <CompanyProfile recruiter={recruiter} />
    </div>
  );
};

export default CompanyPage;
