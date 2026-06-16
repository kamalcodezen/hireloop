"use client";

import { submitJobApplication } from "@/lib/action/applicant";
import { Briefcase, Calendar, FileText, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ApplyForm = ({ applicant, job }) => {
  const router = useRouter();

  const handleApply = async (e) => {
    e.preventDefault();

    const form = e.target;

    const applicationData = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      resumeUrl: form.resumeUrl.value,
      coverLetter: form.coverLetter.value,
      applicantId: applicant?.id,
      applicantEmail: applicant?.email,
      jobId: job?._id,
      companyId: job?.companyId,
      companyName: job?.companyName,
      companyLogo: job?.companyLogo,
      //   status: "pending",
      //   appliedAt: new Date(),
    };

    try {
      const res = await submitJobApplication(applicationData);

      if (res?.success || res?.insertedId) {
        toast.success("Application Submitted Successfully!");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="relative overflow-hidden py-20 bg-background text-foreground">
      {/* Light Mode Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-green-500/10 blur-[140px] rounded-full dark:hidden pointer-events-none" />

      {/* Dark Mode Glow */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-green-500/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* LEFT SIDE: Form Block */}
          <div className="">
            <div className=" border border-border bg-card p-8">
              <h1 className="text-4xl font-bold tracking-tight">
                Apply for {job?.title}
              </h1>
              <p className="mt-3 text-muted-foreground text-sm">
                Complete the application form below to apply.
              </p>
            </div>

            {/* FIXED: Added onSubmit handler */}
            <form onSubmit={handleApply} className="space-y-6">
              <div className=" border border-border bg-card p-8">
                <h2 className="text-2xl font-bold mb-6">Job Application</h2>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName" /* FIXED: Added name attribute */
                      required
                      defaultValue={applicant?.name}
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone" /* FIXED: Added name attribute */
                      required
                      placeholder="+1 234 567 890"
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  {/* Resume pdf*/}
                  {/* <div>
                    <label className="block mb-2 text-sm font-medium">
                      Resume
                    </label>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="w-full"
                    />
                  </div> */}

                  {/* Resume URL */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                      Resume URL
                    </label>
                    <input
                      type="url"
                      name="resumeUrl" /* FIXED: Standardized styles */
                      required
                      placeholder="https://drive.google.com/... or https://your-resume-link.com"
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
                    />
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-muted-foreground">
                      Cover Letter
                      <span className="text-muted-foreground/60 ml-2">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="coverLetter" /* FIXED: Added name attribute */
                      rows={5}
                      placeholder="Tell us why you're a good fit..."
                      className="w-full rounded-xl border border-border bg-background p-4 text-foreground outline-none focus:border-green-500 transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="h-12 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm transition-all cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: Sidebar Job Details */}
          <div>
            <div className="sticky top-24  border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <img
                  src={job?.companyLogo || "https://placehold.co/150x150"}
                  alt={job?.companyName}
                  className="h-14 w-14 object-contain"
                />
                <div>
                  <h3 className="font-bold text-foreground">
                    {job?.companyName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {job?.companyLocation}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-bold mt-6 text-foreground">
                {job?.title}
              </h2>

              <div className="space-y-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-green-500" />
                  <span className="text-foreground">{job?.type}</span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-green-500" />
                  <span className="text-foreground">
                    {job?.city ? `${job.city}, ${job.country}` : "Remote"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-green-500" />
                  <span className="text-foreground">
                    Deadline: {job?.deadline}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-green-500" />
                  <span className="text-foreground">{job?.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyForm;
