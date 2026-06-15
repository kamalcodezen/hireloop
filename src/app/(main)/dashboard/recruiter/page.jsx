import StatsCard from "@/components/dashboard/StatsCard";
import { auth } from "@/lib/auth";
import { FileText, Users, Briefcase, CheckCircle } from "lucide-react";
import { headers } from "next/headers";

const recruiterStats = [
  {
    title: "Total Job Posts",
    value: "48",
    icon: FileText,
  },
  {
    title: "Total Applicants",
    value: "1,284",
    icon: Users,
  },
  {
    title: "Active Jobs",
    value: "18",
    icon: Briefcase,
  },
  {
    title: "Jobs Closed",
    value: "32",
    icon: CheckCircle,
  },
];

export default async function Recruiter() {
  
  // user data access
  const details = await auth.api.getSession({
    headers: await headers(),
  });
  const user = details?.user;
  // console.log(user, "recruiter");

  return (
    <>
      <h2 className="pb-5 text-2xl font-semibold">Welcome, {user.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-6">
        {recruiterStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </>
  );
}
