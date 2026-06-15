"use client";

import { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Pencil,
  Upload,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import { createCompany } from "@/lib/action/companies";
import { toast } from "react-toastify";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogoUpload = async (e) => {
    const image = e.target.files[0];

    if (!image) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_SERVER_IMAGE_UPLOAD_URL}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        setLogoUrl(data.data.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const companyData = {
      name: form.get("name"),
      website: form.get("website"),
      industry: form.get("industry"),
      location: form.get("location"),
      employeeCount: form.get("employeeCount"),
      description: form.get("description"),
      logo: logoUrl,
      status: "Pending",
      recruiterId: recruiter?.id,
    };

    // console.log(companyData);

    setCompany(companyData);
    setIsEditing(false);

    const payload = await createCompany(companyData);

    if (payload.insertedId) {
      toast.success("Company Created Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400">
          <CheckCircle2 size={16} />
          Approved
        </div>
      );
    }

    if (status === "Rejected") {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400">
          <XCircle size={16} />
          Rejected
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400">
        <Clock3 size={16} />
        Pending
      </div>
    );
  };

  /* =========================
     NO COMPANY REGISTERED
  ========================== */

  if (!company?._id && !isEditing) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg border border-border bg-card backdrop-blur-xl p-10 text-center shadow-[0_0_40px_rgba(34,197,94,.08)]">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-green-500/10 flex items-center justify-center mb-6">
              <Building2
                className="text-green-500 dark:text-green-400"
                size={40}
              />
            </div>

            <h1 className="text-4xl font-bold">Register Your Company</h1>

            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Create your company profile to start posting jobs, manage
              applicants and grow your employer brand.
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 px-6 py-3 rounded hover:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 transition-all font-semibold text-white shadow-[0_0_30px_rgba(34,197,94,.25)] cursor-pointer duration-300 transition-all"
            >
              Register Company
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     REGISTER / EDIT FORM
  ========================== */

  if (!company?._id || isEditing) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg border border-border bg-card backdrop-blur-xl p-8">
            <h1 className="text-3xl font-bold mb-2">
              {company ? "Edit Company" : "Register Company"}
            </h1>

            <p className="text-muted-foreground mb-8">
              Complete your company profile.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    Company Name
                  </label>

                  <input
                    name="name"
                    required
                    defaultValue={company?.name}
                    placeholder="Google"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    Website
                  </label>

                  <input
                    name="website"
                    required
                    defaultValue={company?.website}
                    placeholder="https://company.com"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    Industry
                  </label>

                  <input
                    name="industry"
                    required
                    defaultValue={company?.industry}
                    placeholder="Technology"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    Location
                  </label>

                  <input
                    name="location"
                    required
                    defaultValue={company?.location}
                    placeholder="California, USA"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    Employee Count
                  </label>

                  <select
                    name="employeeCount"
                    defaultValue={company?.employeeCount}
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  >
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-muted-foreground">
                    Company Logo
                  </label>

                  <label className="h-12 px-4 rounded-xl bg-background border border-border flex items-center gap-3 cursor-pointer hover:border-green-500 text-muted-foreground transition-colors">
                    <Upload size={18} />
                    {loading ? "Uploading..." : "Upload Logo"}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="logo"
                  className="w-28 h-28 object-cover rounded-md mt-6 border border-border"
                />
              )}

              <div className="mt-6">
                <label className="block mb-2 text-sm text-muted-foreground">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="5"
                  defaultValue={company?.description}
                  placeholder="Tell us about your company..."
                  className="w-full rounded-2xl bg-background border border-border p-4 text-foreground outline-none focus:border-green-500 transition-colors"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 font-semibold text-white shadow-[0_0_30px_rgba(34,197,94,.25)] hover:opacity-90 transition-all cursor-pointer"
                >
                  {company ? "Update Company" : "Create Company"}
                </button>

                {company && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 rounded-xl border border-border hover:bg-muted transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     COMPANY PROFILE
  ========================== */

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg border border-border bg-card p-8 shadow-[0_0_40px_rgba(34,197,94,.04)]">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex items-center gap-5">
              <img
                src={company.logo || "https://placehold.co/150x150"}
                alt=""
                className="w-28 h-28 rounded-lg object-cover border border-border"
              />

              <div>
                <h1 className="text-4xl font-bold">{company.name}</h1>

                <div className="mt-4">{getStatusBadge(company.status)}</div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="h-fit px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-2 hover:bg-green-500/20 transition-colors"
            >
              <Pencil size={18} />
              Edit Company
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8">
          <div className="rounded-lg bg-card border border-border p-6">
            <Globe className="text-green-500 dark:text-green-400" />
            <p className="text-muted-foreground mt-4">Website</p>
            <h3 className="font-semibold mt-2">{company.website}</h3>
          </div>

          <div className="rounded-lg bg-card border border-border p-6">
            <Building2 className="text-green-500 dark:text-green-400" />
            <p className="text-muted-foreground mt-4">Industry</p>
            <h3 className="font-semibold mt-2">{company.industry}</h3>
          </div>

          <div className="rounded-lg bg-card border border-border p-6">
            <MapPin className="text-green-500 dark:text-green-400" />
            <p className="text-muted-foreground mt-4">Location</p>
            <h3 className="font-semibold mt-2">{company.location}</h3>
          </div>

          <div className="rounded-lg bg-card border border-border p-6">
            <Users className="text-green-500 dark:text-green-400" />
            <p className="text-muted-foreground mt-4">Employee Count</p>
            <h3 className="font-semibold mt-2">{company.employeeCount}</h3>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-card border border-border p-8">
          <h2 className="text-2xl font-bold mb-4">About Company</h2>

          <p className="text-muted-foreground leading-relaxed">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
}
