import AdminUsersList from "@/components/dashboard/jobs/AdminUsersList";
import { getUsersList } from "@/lib/api/users";

const AdminUserPage = async () => {
  const data = await getUsersList();
  const users = data?.users;

  return (
    <div>
      <AdminUsersList users={users} />
    </div>
  );
};

export default AdminUserPage;
