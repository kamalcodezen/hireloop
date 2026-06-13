"use client";

import { form } from "framer-motion/client";
import { useState } from "react";

const NewJobs = () => {
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Reset previous errors

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
    };

    console.log(formData);

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
    } else if (formData.responsibilities.length < 50) {
      newErrors.responsibilities = `Responsibilities must be at least 50 characters (Current: ${formData.responsibilities.length})`;
    }

    if (!formData.requirements) {
      newErrors.requirements = "Requirements are required";
    } else if (formData.requirements.length < 50) {
      newErrors.requirements = `Requirements must be at least 50 characters (Current: ${formData.requirements.length})`;
    }

    // Check if there are any errors accumulated
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ================= Success =================
    console.log("Job Data Submission:", formData);
    alert("Validation Passed ✅ Form Submitted Successfully!");
  };

  return (
    <section className="w-full max-w-6xl mx-auto p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground mt-2">
          Create a new job opportunity and publish it to your company profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ================= Job Information ================= */}
        <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
          <h2 className="text-xl font-semibold mb-6">Job Information</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Job Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Senior Frontend Developer"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none ${
                  errors.title
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-border"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Job Category
              </label>
              <select
                name="category"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none ${
                  errors.category ? "border-red-500" : "border-border"
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
              <label className="block mb-2 text-sm font-medium">Job Type</label>
              <select
                name="type"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none ${
                  errors.type ? "border-red-500" : "border-border"
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
              <label className="block mb-2 text-sm font-medium">Currency</label>
              <select
                name="currency"
                className="w-full h-12 px-4 rounded-lg border border-border bg-background outline-none"
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
              <label className="block mb-2 text-sm font-medium">
                Minimum Salary
              </label>
              <input
                name="salaryMin"
                type="number"
                placeholder="3000"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none ${
                  errors.salaryMin ? "border-red-500" : "border-border"
                }`}
              />
              {errors.salaryMin && (
                <p className="text-red-500 text-xs mt-1">{errors.salaryMin}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Maximum Salary
              </label>
              <input
                name="salaryMax"
                type="number"
                placeholder="6000"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none ${
                  errors.salaryMax ? "border-red-500" : "border-border"
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
              <label className="block mb-2 text-sm font-medium">City</label>
              <input
                name="city"
                disabled={isRemote}
                type="text"
                placeholder="Dhaka"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none disabled:opacity-50 ${
                  errors.city && !isRemote ? "border-red-500" : "border-border"
                }`}
              />
              {errors.city && !isRemote && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Country</label>
              <input
                name="country"
                disabled={isRemote}
                type="text"
                placeholder="Bangladesh"
                className={`w-full h-12 px-4 rounded-lg border bg-background outline-none disabled:opacity-50 ${
                  errors.country && !isRemote
                    ? "border-red-500"
                    : "border-border"
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
              onChange={() => {
                setIsRemote(!isRemote);
                setErrors((prev) => ({ ...prev, city: null, country: null }));
              }}
            />
            <label htmlFor="remote" className="font-medium cursor-pointer">
              Remote Position
            </label>
          </div>

          {/* Deadline */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium">
              Application Deadline
            </label>
            <input
              name="deadline"
              type="date"
              className={`w-full h-12 px-4 rounded-lg border bg-background outline-none ${
                errors.deadline ? "border-red-500" : "border-border"
              }`}
            />
            {errors.deadline && (
              <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>
            )}
          </div>
        </div>

        {/* ================= Job Description ================= */}
        <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
          <h2 className="text-xl font-semibold mb-6">Job Description</h2>

          <div className="space-y-6">
            {/* Responsibilities */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Responsibilities
              </label>
              <textarea
                name="responsibilities"
                rows={4}
                placeholder="Describe the responsibilities... (Min 50 characters)"
                className={`w-full rounded-lg border bg-background p-4 outline-none resize-none ${
                  errors.responsibilities ? "border-red-500" : "border-border"
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
              <label className="block mb-2 text-sm font-medium">
                Requirements
              </label>
              <textarea
                name="requirements"
                rows={3}
                placeholder="Describe requirements... (Min 50 characters)"
                className={`w-full rounded-lg border bg-background p-4 outline-none resize-none ${
                  errors.requirements ? "border-red-500" : "border-border"
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
              <label className="block mb-2 text-sm font-medium">
                Benefits (Optional)
              </label>
              <textarea
                name="benefits"
                rows={3}
                placeholder="Health insurance, bonuses, flexible working..."
                className="w-full rounded-lg border border-border bg-background p-4 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* ================= Company ================= */}
        <div className="rounded-lg border border-border bg-card p-6 lg:p-8">
          <h2 className="text-xl font-semibold mb-6">Company Information</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Company Name
              </label>
              <input
                readOnly
                value="HireEdge Inc."
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Company Status
              </label>
              <input
                readOnly
                value="Approved"
                className="w-full h-12 px-4 rounded-xl border border-border bg-muted outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="h-11 px-8 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all cursor-pointer"
          >
            Publish Job
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewJobs;
