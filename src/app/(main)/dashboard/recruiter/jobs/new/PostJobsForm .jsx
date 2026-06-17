"use client";

import { createJobs } from "@/lib/action/jobs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Briefcase,
  Clock3,
  XCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const PostJobsForm = ({ company = { name: "Your Company" } }) => {
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // ১. কোম্পানি না থাকলে এই সেকশনটি শো করবে
  if (!company?._id) {
    return (
      <div className="w-full max-w-2xl mx-auto my-16 rounded-3xl border border-dashed border-border bg-card p-10 text-center py-24 shadow-sm text-foreground">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Register Your Company First
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
          You need to set up a complete company profile before you can start
          publishing open positions.
        </p>
        <Link
          href="/dashboard/recruiter/company"
          className="inline-flex mt-6 h-11 px-6 items-center justify-center rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors cursor-pointer"
        >
          Register Company
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formFields = Object.fromEntries(new FormData(e.currentTarget));

    const formData = {
      title: formFields.title?.trim(),
      category: formFields.category,
      type: formFields.type,
      salaryMin: formFields.salaryMin,
      salaryMax: formFields.salaryMax,
      currency: formFields.currency,
      city: isRemote ? "" : formFields.city?.trim(),
      country: isRemote ? "" : formFields.country?.trim(),
      isRemote,
      deadline: formFields.deadline,
      responsibilities: formFields.responsibilities?.trim(),
      requirements: formFields.requirements?.trim(),
      benefits: formFields.benefits?.trim(),
      status: "active",
      companyId: company?._id,
      companyName: company?.name,
      companyLogo: company?.logo,
      companyLocation: company?.location,
      companyRecruiterId: company?.recruiterId,
    };

    // ================= Validation =================
    const newErrors = {};

    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.category) newErrors.category = "Job category is required";
    if (!formData.type) newErrors.type = "Job type is required";
    if (!formData.salaryMin) newErrors.salaryMin = "Minimum salary is required";
    if (!formData.salaryMax) newErrors.salaryMax = "Maximum salary is required";

    if (
      formData.salaryMin &&
      formData.salaryMax &&
      Number(formData.salaryMin) > Number(formData.salaryMax)
    ) {
      newErrors.salaryMax = "Maximum salary cannot be less than minimum salary";
    }

    if (!formData.isRemote) {
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.country) newErrors.country = "Country is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Application deadline is required";
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deadline = "Deadline cannot be in the past";
      }
    }

    if (!formData.responsibilities) {
      newErrors.responsibilities = "Responsibilities are required";
    } else if (formData.responsibilities.length < 10) {
      newErrors.responsibilities = `Responsibilities must be at least 10 characters`;
    }

    if (!formData.requirements) {
      newErrors.requirements = "Requirements are required";
    } else if (formData.requirements.length < 10) {
      newErrors.requirements = `Requirements must be at least 10 characters`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ================= Success Submission =================
    try {
      const jobsData = await createJobs(formData);
      if (jobsData.insertedId) {
        toast.success("Job Created Successfully!");
        router.refresh();
        router.push("/dashboard/recruiter/jobs");
      } else {
        toast.error("Failed to submit job");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-6 lg:p-8 text-foreground bg-background">
      {/* ================= Form Header Block ================= */}
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fill out the details below to publish your open position.
        </p>

        {/* Company verification status header badge */}
        <div className="mt-4 inline-flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
          <Briefcase size={14} className="text-muted-foreground/75" />
          <span>Posting as:</span>
          <span className="font-semibold text-foreground">{company.name}</span>
          <span
            className={`font-bold px-2 py-0.5 rounded border ${
              company?.status === "Approved"
                ? "text-green-600 bg-green-500/10 border-green-500/20"
                : company?.status === "Rejected"
                  ? "text-red-500 bg-red-500/10 border-red-500/20"
                  : "text-amber-500 bg-amber-500/10 border-amber-500/20"
            }`}
          >
            {company?.status || "Pending"}
          </span>
        </div>
      </div>

      {/* ================= ২. কোম্পানি স্ট্যাটাস মেসেজ অ্যালার্ট ব্লকস ================= */}
      {company?.status !== "Approved" && (
        <div className="max-w-2xl mx-auto my-12 p-8 border rounded-3xl bg-card text-center shadow-sm">
          {company?.status === "Rejected" ? (
            <>
              <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <XCircle size={28} />
              </div>
              <h3 className="text-lg font-bold">Verification Rejected</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Your company verification request has been rejected by our
                administration team. Please update your business documents or
                contact our system support panel.
              </p>
              <Link
                href="/dashboard/recruiter/company"
                className="mt-5 inline-flex h-10 px-5 items-center justify-center bg-muted border border-border rounded-xl text-xs font-semibold text-foreground hover:bg-border"
              >
                Edit Company Info
              </Link>
            </>
          ) : (
            <>
              <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock3 size={28} />
              </div>
              <h3 className="text-lg font-bold">Verification Under Review</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                Your company profile is currently pending verification. For
                security and system alignment, you can only publish job
                circulars once the admin panel approves your platform status.
              </p>
            </>
          )}
        </div>
      )}

      {/* ================= ৩. একটিভ ফর্ম ভিউ (শুধুমাত্র APPROVED কোম্পানি দেখতে পাবে) ================= */}
      {company?.status === "Approved" && (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 animate-in fade-in-50 duration-300"
        >
          {/* Approved Status Banner inside Form */}
          <div className="flex items-start gap-3 bg-green-500/5 dark:bg-green-500/10 border border-green-500/20 rounded-2xl p-4 text-sm text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Verified Corporate Profile Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your account is verified. All published job openings will
                instantly gain high-priority badges on HireEdge job portal home
                directories.
              </p>
            </div>
          </div>

          {/* Job Information */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Job Information</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Job Title
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Senior Frontend Developer"
                  className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none transition-colors ${
                    errors.title
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Job Category
                </label>
                <select
                  name="category"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
                >
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

              {/* Job Type */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Job Type
                </label>
                <select
                  name="type"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Currency */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Currency
                </label>
                <select
                  name="currency"
                  className="w-full h-12 px-4 rounded-xl border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="BDT">BDT (৳)</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Minimum Salary
                </label>
                <input
                  name="salaryMin"
                  type="number"
                  placeholder="3000"
                  className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none transition-colors ${
                    errors.salaryMin
                      ? "border-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.salaryMin && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.salaryMin}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Maximum Salary
                </label>
                <input
                  name="salaryMax"
                  type="number"
                  placeholder="6000"
                  className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none transition-colors ${
                    errors.salaryMax
                      ? "border-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.salaryMax && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.salaryMax}
                  </p>
                )}
              </div>
            </div>

            {/* Location Fields */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  City
                </label>
                <input
                  name="city"
                  disabled={isRemote}
                  type="text"
                  placeholder="Dhaka"
                  className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none disabled:opacity-40 transition-colors ${
                    errors.city && !isRemote
                      ? "border-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.city && !isRemote && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Country
                </label>
                <input
                  name="country"
                  disabled={isRemote}
                  type="text"
                  placeholder="Bangladesh"
                  className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none disabled:opacity-40 transition-colors ${
                    errors.country && !isRemote
                      ? "border-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.country && !isRemote && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.country}
                  </p>
                )}
              </div>
            </div>

            {/* Remote Checkbox */}
            <div className="mt-6 flex items-center gap-3">
              <input
                id="remote"
                type="checkbox"
                checked={isRemote}
                className="accent-green-600 h-4 w-4 rounded cursor-pointer"
                onChange={() => {
                  setIsRemote(!isRemote);
                  setErrors((prev) => ({ ...prev, city: null, country: null }));
                }}
              />
              <label
                htmlFor="remote"
                className="text-sm font-semibold cursor-pointer text-foreground select-none"
              >
                This is a fully remote position
              </label>
            </div>

            {/* Deadline */}
            <div className="mt-6">
              <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                Application Deadline
              </label>
              <input
                name="deadline"
                type="date"
                className={`w-full h-12 px-4 rounded-xl border bg-background text-foreground outline-none transition-colors ${
                  errors.deadline
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.deadline}
                </p>
              )}
            </div>
          </div>

          {/* ================= Job Descriptions Section ================= */}
          <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">
              Job Requirements & Description
            </h2>

            <div className="space-y-6">
              {/* Responsibilities */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  rows={4}
                  placeholder="Detail the daily operations, core targets, and tasks for this role..."
                  className={`w-full rounded-xl border bg-background text-foreground p-4 outline-none resize-none transition-colors ${
                    errors.responsibilities
                      ? "border-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.responsibilities && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.responsibilities}
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  rows={3}
                  placeholder="Experience levels, mandatory skills, certifications, stack competencies..."
                  className={`w-full rounded-xl border bg-background text-foreground p-4 outline-none resize-none transition-colors ${
                    errors.requirements
                      ? "border-red-500"
                      : "border-border focus:border-green-500"
                  }`}
                />
                {errors.requirements && (
                  <p className="text-red-500 text-xs mt-1 font-medium">
                    {errors.requirements}
                  </p>
                )}
              </div>

              {/* Benefits */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-muted-foreground">
                  Benefits (Optional)
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  placeholder="Health insurance packages, target performance bonuses, corporate equity, flexible leaves..."
                  className="w-full rounded-xl border border-border bg-background text-foreground p-4 outline-none resize-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* ================= Form Submission Control Block ================= */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground max-w-md">
              By publishing, this listing complies with our standard employment
              policies. Approved postings run actively for a 30-day billing
              month cycle.
            </div>
            <button
              type="submit"
              className="h-12 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-green-600/10 cursor-pointer shrink-0"
            >
              Publish Job Post
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default PostJobsForm;
