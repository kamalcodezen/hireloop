"use client";

import { useState } from "react";

const NewJobs = () => {
  const [isRemote, setIsRemote] = useState(false);

  return (
    <section className="w-full max-w-6xl mx-auto p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Post a New Job</h1>

        <p className="text-muted-foreground mt-2">
          Create a new job opportunity and publish it to your company profile.
        </p>
      </div>

      <form className="space-y-8">
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
                type="text"
                placeholder="Senior Frontend Developer"
                className="
                w-full
                h-12
                px-4
                rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Job Category
              </label>

              <select
                className="
                w-full
                h-12
                px-4
               rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              >
                <option>Software Development</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Finance</option>
                <option>Human Resources</option>
              </select>
            </div>

            {/* Job Type */}
            <div>
              <label className="block mb-2 text-sm font-medium">Job Type</label>

              <select
                className="
                w-full
                h-12
                px-4
               rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block mb-2 text-sm font-medium">Currency</label>

              <select
                className="
                w-full
                h-12
                px-4
                rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>BDT</option>
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
                type="number"
                placeholder="3000"
                className="
                w-full
                h-12
                px-4
                rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Maximum Salary
              </label>

              <input
                type="number"
                placeholder="6000"
                className="
                w-full
                h-12
                px-4
                rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid lg:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block mb-2 text-sm font-medium">City</label>

              <input
                disabled={isRemote}
                type="text"
                placeholder="Dhaka"
                className="
                w-full
                h-12
                px-4
                rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Country</label>

              <input
                disabled={isRemote}
                type="text"
                placeholder="Bangladesh"
                className="
                w-full
                h-12
                px-4
                rounded-lg
                border
                border-border
                bg-background
                outline-none
              "
              />
            </div>
          </div>

          {/* Remote */}
          <div className="mt-6 flex items-center gap-3">
            <input
              id="remote"
              type="checkbox"
              checked={isRemote}
              onChange={() => setIsRemote(!isRemote)}
            />

            <label htmlFor="remote" className="font-medium">
              Remote Position
            </label>
          </div>

          {/* Deadline */}
          <div className="mt-6">
            <label className="block mb-2 text-sm font-medium">
              Application Deadline
            </label>

            <input
              type="date"
              className="
              w-full
              h-12
              px-4
              rounded-lg
              border
              border-border
              bg-background
              outline-none
            "
            />
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
                rows={4}
                placeholder="Describe the responsibilities..."
                className="
                w-full
                rounded-lg
                border
                border-border
                bg-background
                p-4
                outline-none
                resize-none
              "
              />
            </div>

            {/* Requirements */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Requirements
              </label>

              <textarea
                rows={3}
                placeholder="Describe requirements..."
                className="
                w-full
                rounded-lg
                border
                border-border
                bg-background
                p-4
                outline-none
                resize-none
              "
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Benefits (Optional)
              </label>

              <textarea
                rows={3}
                placeholder="Health insurance, bonuses, flexible working..."
                className="
                w-full
                rounded-lg
                border
                border-border
                bg-background
                p-4
                outline-none
                resize-none
              "
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
                className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-border
                bg-muted
              "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Company Status
              </label>

              <input
                readOnly
                value="Approved"
                className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-border
                bg-muted
              "
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="
            h-11
            px-8
            rounded-lg
            bg-green-600
            hover:bg-green-700
            text-white
            font-medium
            transition-all cursor-pointer
          "
          >
            Publish Job
          </button>
        </div>
      </form>
    </section>
  );
};

export default NewJobs;
