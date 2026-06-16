import { requireAccessRole } from "@/lib/core/session";

const AdminLayout = async ({ children }) => {
  await requireAccessRole("admin");

  return children;
};

export default AdminLayout;
