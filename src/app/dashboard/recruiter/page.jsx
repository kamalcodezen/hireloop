import StatsCard from "@/components/dashboard/StatsCard";
import { FileText, Users, Briefcase, CheckCircle } from "lucide-react";

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

export default function Recruiter() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4  gap-6">
      {recruiterStats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
