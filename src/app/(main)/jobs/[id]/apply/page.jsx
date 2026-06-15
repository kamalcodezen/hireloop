import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getJobDetailsById } from "@/lib/api/jobs";
import { getApplicationByApplicant } from "@/lib/api/applicant";

const JobApplyPage = async ({ params }) => {
  const { id } = await params;

  const user = await getUserSession();

  // Not Logged In
  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }

  const job = await getJobDetailsById(id);

  const applications = (await getApplicationByApplicant(user?.id)) || [];

  // Recruiter/Admin Restriction
  if (user.role !== "seeker") {
    return (
      <div className="w-11/12 mx-auto min-h-[70vh] flex items-center justify-center pt-28">
        <div className="max-w-lg w-full rounded-3xl border border-border bg-card p-8 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center text-4xl">
            🚫
          </div>

          <h1 className="mt-6 text-2xl font-bold">Access Restricted</h1>

          <p className="mt-3 text-muted-foreground">
            Only job seekers can apply for jobs. Recruiter and admin accounts
            are not allowed to submit job applications.
          </p>

          <Link
            href="/jobs"
            className="
              mt-6
              inline-flex
              items-center
              justify-center
              h-11
              px-6
              rounded-xl
              bg-green-600
              hover:bg-green-700
              text-white
              font-medium
            "
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Free Plan
  const plan = {
    name: "Free",
    maxApplicationLength: 3,
  };

  // Already Applied Check
  const alreadyApplied = applications.find(
    (application) => application.jobId === id,
  );

  if (alreadyApplied) {
    return (
      <div className="w-11/12 mx-auto min-h-[70vh] flex items-center justify-center pt-28">
        <div className="max-w-xl w-full rounded border border-border bg-card p-8 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center text-4xl">
            ✅
          </div>

          <h2 className="mt-6 text-2xl font-bold">
            Application Already Submitted
          </h2>

          <p className="mt-3 text-muted-foreground">
            You have already applied for this job. Recruiters are reviewing your
            application.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <Link
              href="/dashboard/seeker/applications"
              className="
                h-11
                px-6
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                inline-flex
                items-center
              "
            >
              View Applications
            </Link>

            <Link
              href="/jobs"
              className="
                h-11
                px-6
                rounded-xl
                border
                border-border
                inline-flex
                items-center
              "
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Application Limit Check
  const limitReached = applications.length >= plan.maxApplicationLength;

  if (limitReached) {
    return (
      <div className="w-11/12 mx-auto min-h-[70vh] flex items-center justify-center pt-28">
        <div className="max-w-xl w-full rounded border border-border bg-card p-8 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-red-500/10 flex items-center justify-center text-4xl">
            📄
          </div>

          <h2 className="mt-6 text-2xl font-bold">Application Limit Reached</h2>

          <p className="mt-3 text-muted-foreground">
            Your Free plan allows only{" "}
            <span className="font-semibold text-green-500">
              {plan.maxApplicationLength}
            </span>{" "}
            job applications.
          </p>

          <p className="mt-2 text-muted-foreground">
            Upgrade your plan to apply for unlimited jobs.
          </p>

          <div className="flex justify-center gap-3 mt-6">
            <Link
              href="/pricing"
              className="
                h-11
                px-6
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                inline-flex
                items-center
              "
            >
              Upgrade Plan
            </Link>

            <Link
              href="/jobs"
              className="
                h-11
                px-6
                rounded-xl
                border
                border-border
                inline-flex
                items-center
              "
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Apply Form
  return (
    <div>
      <JobApply applicant={user} job={job} />
    </div>
  );
};

export default JobApplyPage;
