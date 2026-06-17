import CompaniesList from "@/components/dashboard/CompaniesList";
import { getAllCompanies } from "@/lib/api/companies";
import { Building2 } from "lucide-react";

const AdminCompaniesPage = async () => {
  // ডাটাবেজ থেকে সব কোম্পানির লিস্ট নিয়ে আসা হচ্ছে
  const companies = (await getAllCompanies()) || [];

  return (
    <section className="space-y-6 text-foreground bg-background min-h-screen">
      {/* Admin Panel Header */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
            <Building2 size={22} />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Manage Companies</h1>
        </div>
        <p className="text-sm text-muted-foreground pl-11">
          Review, approve, or restrict corporate company registry platforms across HireEdge network directories.
        </p>
      </div>

      {/* Client Interaction List Component */}
      <CompaniesList initialCompanies={companies} />
    </section>
  );
};

export default AdminCompaniesPage;