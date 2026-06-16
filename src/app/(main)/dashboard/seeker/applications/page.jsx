import { getApplicationByApplicant } from "@/lib/api/applicant";
import { getUserSession } from "@/lib/core/session";
 // নিচ থেকে ক্লায়েন্ট কম্পোনেন্টটি ইম্পোর্ট করা হচ্ছে
import { Briefcase } from "lucide-react";
import ApplicationsList from "./applicationsList";

const SeekerApplicationsPage = async () => {
  const user = await getUserSession();

  // এপিআই থেকে ইউজারের সব অ্যাপ্লিকেশনের ডেটা তুলে আনা হচ্ছে
  const applications = (await getApplicationByApplicant(user?.id)) || [];

  return (
    <section className="space-y-6 text-foreground bg-background min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
            <Briefcase size={20} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Applications
          </h1>
        </div>
        <p className="text-sm text-muted-foreground pl-10">
          Track and manage all the positions you have applied for in one central
          hub.
        </p>
      </div>

      {/* Dynamic Table & Empty State Content Area */}
      <ApplicationsList initialApplications={applications} />
    </section>
  );
};

export default SeekerApplicationsPage;
