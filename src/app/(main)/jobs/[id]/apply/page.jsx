import { getUserSession } from "@/lib/core/session";
import Link from "next/link";
import { redirect } from "next/navigation";

const ApplyForJobPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/login?redirect=/jobs/${id}/apply`);
  }

  if (user?.role !== "seeker") {
    return (
      <div className="w-11/12 mx-auto min-h-[70vh] flex items-center justify-center pt-28">
        <div
          className="
          max-w-lg
          w-full
          rounded-lg
          border
          border-border
          bg-card
          p-8
          text-center
        "
        >
          <div
            className="
            h-20
            w-20
            mx-auto
            rounded-full
            bg-amber-500/10
            flex
            items-center
            justify-center
            text-4xl
          "
          >
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

  return (
    <div>
      <h2>Apply for this page</h2>
    </div>
  );
};

export default ApplyForJobPage;
