"use client";

import { createJobs } from "@/lib/action/jobs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Briefcase } from "lucide-react"; 
import Link from "next/link";

const PostJobsForm = ({ company = { name: "Your Company" } }) => {
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // company na thakle ata show hobe
  if (!company?._id) {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center py-40">
        <h2 className="text-2xl font-bold">Register Your Company First</h2>

        <p className="mt-2 text-muted-foreground">
          You need to create a company profile before posting jobs.
        </p>

        <Link
          href="/dashboard/recruiter/company"
          className="
          inline-flex
          mt-6
          h-10
          px-6
          items-center
          rounded-xl
          bg-green-600
          hover:bg-green-700
          text-white
        "
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
      // company: formFields.company?.trim(),
      status: "active",
      companyId: company?._id,
      companyName: company?.name,
      companyLocation: company?.location,
      companyRecruiterId: company?.recruiterId,
    };

    // ================= Validation =================
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Job title is required";
    }

    if (!formData.category) {
      newErrors.category = "Job category is required";
    }

    if (!formData.type) {
      newErrors.type = "Job type is required";
    }

    if (!formData.salaryMin) {
      newErrors.salaryMin = "Minimum salary is required";
    }

    if (!formData.salaryMax) {
      newErrors.salaryMax = "Maximum salary is required";
    }

    if (
      formData.salaryMin &&
      formData.salaryMax &&
      Number(formData.salaryMin) > Number(formData.salaryMax)
    ) {
      newErrors.salaryMax = "Maximum salary cannot be less than minimum salary";
    }

    if (!formData.isRemote) {
      if (!formData.city) {
        newErrors.city = "City is required";
      }
      if (!formData.country) {
        newErrors.country = "Country is required";
      }
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
      newErrors.responsibilities = `Responsibilities must be at least 10 characters (Current: ${formData.responsibilities.length})`;
    }

    if (!formData.requirements) {
      newErrors.requirements = "Requirements are required";
    } else if (formData.requirements.length < 10) {
      newErrors.requirements = `Requirements must be at least 10 characters (Current: ${formData.requirements.length})`;
    }

    // if (!formData.company) {
    //   newErrors.company = "Company name is required";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ================= Success =================
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
    <section className="w-full max-w-6xl mx-auto p-6 lg:p-8 text-foreground">
      {/* ================= New Form Header Block ================= */}
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fill out the details below to publish your open position.
        </p>

        {/* Company verification status panel */}
        <div className="mt-4 inline-flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
          <Briefcase size={14} className="text-muted-foreground/75" />
          <span>Posting as:</span>
          <span className="font-semibold text-foreground">{company.name}</span>
          <span className="text-green-600 dark:text-green-400 font-medium bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
            Approved
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ================= Job Information ================= */}
        <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
          <h2 className="text-xl font-semibold mb-6">Job Information</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Job Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Senior Frontend Developer"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                  errors.title
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Job Category
              </label>
              <select
                name="category"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                  errors.category
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
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
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>

            {/* Job Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Job Type
              </label>
              <select
                name="type"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                  errors.type
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-xs mt-1">{errors.type}</p>
              )}
            </div>

            {/* Currency */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Currency
              </label>
              <select
                name="currency"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background text-foreground outline-none focus:border-green-500 transition-colors"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="BDT">BDT</option>
              </select>
            </div>
          </div>

          {/* Salary */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Minimum Salary
              </label>
              <input
                name="salaryMin"
                type="number"
                placeholder="3000"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                  errors.salaryMin
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.salaryMin && (
                <p className="text-red-500 text-xs mt-1">{errors.salaryMin}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Maximum Salary
              </label>
              <input
                name="salaryMax"
                type="number"
                placeholder="6000"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                  errors.salaryMax
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.salaryMax && (
                <p className="text-red-500 text-xs mt-1">{errors.salaryMax}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                City
              </label>
              <input
                name="city"
                disabled={isRemote}
                type="text"
                placeholder="Dhaka"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none disabled:opacity-50 transition-colors ${
                  errors.city && !isRemote
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.city && !isRemote && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Country
              </label>
              <input
                name="country"
                disabled={isRemote}
                type="text"
                placeholder="Bangladesh"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none disabled:opacity-50 transition-colors ${
                  errors.country && !isRemote
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.country && !isRemote && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Remote */}
          <div className="mt-6 flex items-center gap-3">
            <input
              id="remote"
              type="checkbox"
              checked={isRemote}
              className="accent-green-600 h-4 w-4"
              onChange={() => {
                setIsRemote(!isRemote);
                setErrors((prev) => ({ ...prev, city: null, country: null }));
              }}
            />
            <label
              htmlFor="remote"
              className="font-medium cursor-pointer text-foreground"
            >
              Remote Position
            </label>
          </div>

          {/* Deadline */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-muted-foreground">
              Application Deadline
            </label>
            <input
              name="deadline"
              type="date"
              className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                errors.deadline
                  ? "border-red-500"
                  : "border-border focus:border-green-500"
              }`}
            />
            {errors.deadline && (
              <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
            )}
          </div>
        </div>

        {/* ================= Job Description ================= */}
        <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
          <h2 className="text-xl font-semibold mb-6">Job Description</h2>

          <div className="space-y-6">
            {/* Responsibilities */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Responsibilities
              </label>
              <textarea
                name="responsibilities"
                rows={4}
                placeholder="Describe the responsibilities... (Min 10 characters)"
                className={`w-full rounded-lg border bg-background text-foreground p-4 outline-none resize-none transition-colors ${
                  errors.responsibilities
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.responsibilities && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.responsibilities}
                </p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Requirements
              </label>
              <textarea
                name="requirements"
                rows={3}
                placeholder="Describe requirements... (Min 10 characters)"
                className={`w-full rounded-lg border bg-background text-foreground p-4 outline-none resize-none transition-colors ${
                  errors.requirements
                    ? "border-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.requirements && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.requirements}
                </p>
              )}
            </div>

            {/* Benefits */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Benefits (Optional)
              </label>
              <textarea
                name="benefits"
                rows={3}
                placeholder="Health insurance, bonuses, flexible working..."
                className="w-full rounded-lg border border-border bg-background text-foreground p-4 outline-none resize-none focus:border-green-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ================= Company ================= */}
        <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Company Name */}
            {/* <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Company Name
              </label>
              <input
                name="company"
                type="text"
                placeholder="Enter Company Name"
                className={`w-full h-12 px-4 rounded-lg border bg-background text-foreground outline-none transition-colors ${
                  errors.company
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-border focus:border-green-500"
                }`}
              />
              {errors.company && (
                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
              )}
            </div> */}

            {/* Company Status */}
            <div>
              <label className="block mb-2 text-sm font-medium text-muted-foreground">
                Job Status
              </label>
              <input
                readOnly
                value="active"
                className="w-full h-12 px-4 rounded-lg border border-border bg-muted outline-none select-none capitalize text-green-600 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="h-11 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all shadow-sm cursor-pointer"
          >
            Publish Job
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostJobsForm;
