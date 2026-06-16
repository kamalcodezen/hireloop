import { requireAccessRole } from "@/lib/core/session";

const RecruiterLayout = async ({ children }) => {
  await requireAccessRole("recruiter");

  return children;
};

export default RecruiterLayout;
