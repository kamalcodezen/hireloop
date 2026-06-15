import React from "react";
import PostJobsForm from "./PostJobsForm ";
import { getLoggedRecruiterCompany } from "@/lib/api/companies";

const PostJobsPage = async () => {
  const company = await getLoggedRecruiterCompany();

  return (
    <div>
      <PostJobsForm company={company} />
    </div>
  );
};

export default PostJobsPage;
