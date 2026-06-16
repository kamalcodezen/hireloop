import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getJobDetailsById } from "@/lib/api/jobs";
import { getApplicationByApplicant } from "@/lib/api/applicant";
import { Rocket, AlertTriangle, ShieldAlert } from "lucide-react";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();


  // user login na thakle login korte niye jabe redirect kore
  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }

  
  // job seeker nahole ei sms dekhabo age jete debo na
  if (user.role !== "seeker") {
    return (
      <div className="w-11/12 mx-auto min-h-[75vh] flex items-center justify-center pt-28 text-foreground bg-background">
        <div className="max-w-lg w-full rounded-3xl border border-border bg-card p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldAlert size={32} />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">
            Access Restricted
          </h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Only job seekers can apply for jobs. Recruiter and admin accounts
            are not allowed to submit job applications.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex items-center justify-center h-11 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-all shadow-sm"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  // ৩. ডাটাবেজ থেকে ডেটা কালেকশন
  const job = await getJobDetailsById(id);

  // amr ei user id id job collection gulo dao
  const applications = (await getApplicationByApplicant(user?.id)) || [];

  // ৪. সাময়িকভাবে ফলব্যাক/ডামি প্ল্যান কনফিগারেশন (যাতে ডাটাবেজ ছাড়া ক্র্যাশ না করে)
  const plan = {
    name: "Free Seeker",
    maxApplicationsPerMonth: 3, 
  };

 
  // akta job apply korle oi company te ar korte debo na
  const alreadyApplied = applications.find(
    (application) => application.jobId === id,
  );

  if (alreadyApplied) {
    return (
      <div className="w-11/12 mx-auto min-h-[75vh] flex items-center justify-center pt-28 text-foreground bg-background">
        <div className="max-w-xl w-full rounded-3xl border border-border bg-card p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center text-2xl">
            ✅
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">
            Application Already Submitted
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            You have already applied for this job. Our recruiters and company
            reviewers are currently evaluating your profile.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Link
              href="/dashboard/seeker/applications"
              className="h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white inline-flex items-center text-sm font-semibold transition-colors shadow-sm"
            >
              View Applications
            </Link>
            <Link
              href="/jobs"
              className="h-11 px-5 rounded-xl border border-border inline-flex items-center text-sm font-medium hover:bg-muted transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ৬. লিমিট বা কোটা ক্যালকুলেশন
  const applicationCount = applications?.length || 0;
  const hasReachedLimit = applicationCount >= plan.maxApplicationsPerMonth;

  // প্রোগ্রেস বারের জন্য রেশিও/পারসেন্টেজ ক্যালকুলেশন
  const usagePercentage = Math.min(
    (applicationCount / plan.maxApplicationsPerMonth) * 100,
    100,
  );

  return (
    <div className="w-full min-h-screen bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-11/12 mx-auto">
        {/* কোটা ট্র্যাকার কার্ড (HireEdge প্রিমিয়াম UI থিম) */}
        <div className="bg-card border border-border rounded py-3 px-6 shadow-[0_4px_30px_rgba(0,0,0,0.01)] dark:shadow-[0_4px_30px_rgba(34,197,94,0.01)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Monthly Quota Status
              </span>
              <h2 className="text-lg font-bold mt-1">
                You have applied to{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  {applicationCount}
                </span>{" "}
                out of{" "}
                <span className="text-muted-foreground font-semibold">
                  {plan.maxApplicationsPerMonth}
                </span>{" "}
                positions
              </h2>
            </div>
            <span className="self-start sm:self-center px-3 py-1.5 text-xs font-semibold rounded-full bg-muted border border-border text-muted-foreground">
              Current Plan:{" "}
              <strong className="text-foreground font-bold">{plan.name}</strong>
            </span>
          </div>

          {/* ডাইনামিক প্রোগ্রেস বার */}
          <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden mb-5 border border-border/30">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                hasReachedLimit
                  ? "bg-red-500"
                  : usagePercentage > 75
                    ? "bg-amber-500"
                    : "bg-green-600"
              }`}
              style={{ width: `${usagePercentage}%` }}
            />
          </div>

          {/* আপগ্রেড অ্যালার্ট ব্লক */}
          <div className="flex items-start gap-3 bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-sm text-green-700 dark:text-green-400">
            <Rocket className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div className="flex-1 sm:flex sm:items-center sm:justify-between gap-4">
              <p className="leading-relaxed font-medium">
                Need to apply for more positions? Upgrade your account to unlock
                unlimited job submissions and AI features.
              </p>
              <Link
                href="/plans"
                className="inline-block mt-2 sm:mt-0 whitespace-nowrap text-xs font-bold bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl transition-all shadow-sm"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>

        {/* ফর্ম অথবা লকআউট স্টেট রেন্ডারিং */}
        {hasReachedLimit ? (
          /* লিমিট শেষ হলে এই ভিউটি দেখাবে */
          <div className="bg-card border border-dashed border-border rounded p-10 text-center flex flex-col items-center justify-center shadow-sm">
            <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-foreground">
              Application Limit Reached
            </h4>
            <p className="text-sm text-muted-foreground max-w-sm mt-2 leading-relaxed">
              You have exhausted your free credits for this calendar cycle.
              Upgrade your tier to resume submitting applications immediately.
            </p>
            <Link
              href="/plans"
              className="mt-5 text-sm font-bold text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1"
            >
              Upgrade Your Plan &rarr;
            </Link>
          </div>
        ) : (
          /* একটিভ ফর্ম ভিউ (সব ঠিক থাকলে ফর্মটি আসবে) */
          <div className="animate-in fade-in-50 duration-300">
            <JobApply applicant={user} job={job} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplyPage;
