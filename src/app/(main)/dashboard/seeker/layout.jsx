import { requireAccessRole } from "@/lib/core/session";

const SeekerLayout = async ({ children }) => {
  await requireAccessRole("seeker");

  return children;
};

export default SeekerLayout;
