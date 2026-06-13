import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashBoardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main className="flex-1 min-h-screen p-6">{children}</main>
    </div>
  );
};

export default DashBoardLayout;
